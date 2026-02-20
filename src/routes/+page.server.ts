import { db } from '$lib/server/db';
import { products, productImages } from '$lib/server/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const featuredProducts = await db
		.select()
		.from(products)
		.where(eq(products.status, 'available'))
		.orderBy(desc(products.createdAt))
		.limit(6);

	const productIds = featuredProducts.map((p) => p.id);
	const images =
		productIds.length > 0
			? await db.select().from(productImages).where(eq(productImages.sortOrder, 0))
			: [];

	const imageMap: Record<number, string> = {};
	for (const img of images) {
		if (productIds.includes(img.productId) && !imageMap[img.productId]) {
			imageMap[img.productId] = img.url;
		}
	}

	return {
		featuredProducts,
		imageMap
	};
};
