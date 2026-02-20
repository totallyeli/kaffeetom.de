import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { archiveStripeProduct } from '$lib/server/product-sync';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const allProducts = await db
		.select({
			id: products.id,
			name: products.name,
			price: products.price,
			status: products.status,
			qualityTier: products.qualityTier,
			modelSeries: products.modelSeries,
			stripePriceId: products.stripePriceId,
			updatedAt: products.updatedAt
		})
		.from(products)
		.orderBy(desc(products.updatedAt));

	return {
		products: allProducts.map((product) => ({
			...product,
			updatedAt: product.updatedAt.toISOString()
		}))
	};
};

export const actions: Actions = {
	delete: async (event) => {
		requireAdmin(event);
		const formData = await event.request.formData();
		const id = Number.parseInt(String(formData.get('id') ?? ''), 10);

		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { error: 'Ungultige Produkt-ID.' });
		}

		const [product] = await db
			.select({ id: products.id })
			.from(products)
			.where(eq(products.id, id));
		if (!product) {
			return fail(404, { error: 'Produkt nicht gefunden.' });
		}

		await archiveStripeProduct(id);
		await db.delete(products).where(eq(products.id, id));

		redirect(303, '/admin/products');
	}
};
