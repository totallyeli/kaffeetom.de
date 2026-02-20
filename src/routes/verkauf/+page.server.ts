import { db } from '$lib/server/db';
import { products, productImages } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allProducts = await db
		.select()
		.from(products)
		.where(eq(products.qualityTier, 'standard'))
		.orderBy(desc(products.createdAt));

	const images = await db.select().from(productImages).where(eq(productImages.sortOrder, 0));

	const imageMap: Record<number, string> = {};
	for (const img of images) {
		if (!imageMap[img.productId]) {
			imageMap[img.productId] = img.url;
		}
	}

	return { products: allProducts, imageMap };
};
