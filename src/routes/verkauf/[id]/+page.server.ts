import { db } from '$lib/server/db';
import { products, productImages } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number.parseInt(params.id, 10);
	if (Number.isNaN(id)) throw error(404, 'Product not found');

	const [product] = await db.select().from(products).where(eq(products.id, id));
	if (!product) throw error(404, 'Product not found');

	const images = await db
		.select()
		.from(productImages)
		.where(eq(productImages.productId, id))
		.orderBy(asc(productImages.sortOrder));

	return { product, images };
};
