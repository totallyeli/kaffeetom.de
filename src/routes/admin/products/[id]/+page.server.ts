import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { categories, productImages, products } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { syncProductToStripe } from '$lib/server/product-sync';
import { deleteProductImage, uploadProductImage } from '$lib/server/upload';
import { productStatuses, qualityTiers } from '$lib/config';
import { asc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

function parseEuroToCents(input: FormDataEntryValue | null): number {
	const normalized = String(input ?? '')
		.replace(',', '.')
		.replace(/[^0-9.]/g, '')
		.trim();
	const numeric = Number.parseFloat(normalized);
	if (!Number.isFinite(numeric) || numeric < 0) {
		return Number.NaN;
	}
	return Math.round(numeric * 100);
}

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);
	const id = Number.parseInt(event.params.id, 10);
	if (!Number.isInteger(id) || id <= 0) {
		error(404, 'Produkt nicht gefunden.');
	}

	const [product] = await db.select().from(products).where(eq(products.id, id));
	if (!product) {
		error(404, 'Produkt nicht gefunden.');
	}

	const [image] = await db
		.select({ id: productImages.id, url: productImages.url })
		.from(productImages)
		.where(eq(productImages.productId, id))
		.orderBy(asc(productImages.sortOrder));

	const allCategories = await db
		.select({ id: categories.id, name: categories.name })
		.from(categories)
		.orderBy(asc(categories.sortOrder));

	return {
		product: {
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString()
		},
		image: image ?? null,
		categories: allCategories,
		productStatuses,
		qualityTiers
	};
};

export const actions: Actions = {
	default: async (event) => {
		requireAdmin(event);
		const id = Number.parseInt(event.params.id, 10);
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { error: 'Ungultige Produkt-ID.' });
		}

		const [existingProduct] = await db
			.select({ id: products.id, name: products.name })
			.from(products)
			.where(eq(products.id, id));
		if (!existingProduct) {
			return fail(404, { error: 'Produkt nicht gefunden.' });
		}

		const formData = await event.request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const nameEn = String(formData.get('nameEn') ?? '').trim() || null;
		const description = String(formData.get('description') ?? '').trim() || null;
		const descriptionEn = String(formData.get('descriptionEn') ?? '').trim() || null;
		const status = String(formData.get('status') ?? '').trim();
		const qualityTier = String(formData.get('qualityTier') ?? '').trim();
		const condition = String(formData.get('condition') ?? '').trim() || null;
		const modelSeries = String(formData.get('modelSeries') ?? '').trim() || null;
		const warrantyMonths = Number.parseInt(String(formData.get('warrantyMonths') ?? ''), 10);
		const categoryIdRaw = String(formData.get('categoryId') ?? '').trim();
		const image = formData.get('image');

		if (!name) {
			return fail(400, { error: 'Name ist erforderlich.' });
		}

		if (!productStatuses.includes(status as (typeof productStatuses)[number])) {
			return fail(400, { error: 'Ungultiger Status.' });
		}

		if (!qualityTiers.includes(qualityTier as (typeof qualityTiers)[number])) {
			return fail(400, { error: 'Ungultige Qualitatsstufe.' });
		}

		const price = parseEuroToCents(formData.get('price'));
		if (!Number.isInteger(price) || price < 0) {
			return fail(400, { error: 'Ungultiger Preis.' });
		}

		if (!Number.isInteger(warrantyMonths) || warrantyMonths < 0) {
			return fail(400, { error: 'Ungultige Garantiezeit.' });
		}

		const categoryId = categoryIdRaw ? Number.parseInt(categoryIdRaw, 10) : null;
		if (categoryIdRaw && (!Number.isInteger(categoryId) || (categoryId ?? 0) <= 0)) {
			return fail(400, { error: 'Ungultige Kategorie.' });
		}

		await db
			.update(products)
			.set({
				name,
				nameEn,
				description,
				descriptionEn,
				price,
				status,
				qualityTier,
				condition,
				modelSeries,
				warrantyMonths,
				categoryId,
				updatedAt: new Date()
			})
			.where(eq(products.id, id));

		if (image instanceof File && image.size > 0) {
			const imageUrl = await uploadProductImage(image);
			const [existingImage] = await db
				.select({ id: productImages.id, url: productImages.url })
				.from(productImages)
				.where(eq(productImages.productId, id))
				.orderBy(asc(productImages.sortOrder));

			if (existingImage) {
				await deleteProductImage(existingImage.url);
				await db
					.update(productImages)
					.set({ url: imageUrl, alt: name })
					.where(eq(productImages.id, existingImage.id));
			} else {
				await db
					.insert(productImages)
					.values({ productId: id, url: imageUrl, alt: name, sortOrder: 0 });
			}
		}

		await syncProductToStripe(id);
		redirect(303, `/admin/products/${id}`);
	}
};
