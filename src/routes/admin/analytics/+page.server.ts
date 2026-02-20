import { db } from '$lib/server/db';
import { pageViews } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { count, desc, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const [totals] = await db
		.select({
			totalViews: count(),
			uniqueVisitors: sql<number>`count(distinct coalesce(${pageViews.visitorId}, ${pageViews.ipAddress}))`
		})
		.from(pageViews);

	const recentViews = await db
		.select({
			id: pageViews.id,
			landingPage: pageViews.landingPage,
			visitorId: pageViews.visitorId,
			ipAddress: pageViews.ipAddress,
			referer: pageViews.referer,
			userAgent: pageViews.userAgent,
			locale: pageViews.locale,
			createdAt: pageViews.createdAt
		})
		.from(pageViews)
		.orderBy(desc(pageViews.createdAt))
		.limit(100);

	return {
		summary: {
			totalViews: Number(totals.totalViews),
			uniqueVisitors: Number(totals.uniqueVisitors)
		},
		recentViews: recentViews.map((view) => ({ ...view, createdAt: view.createdAt.toISOString() }))
	};
};
