import { db } from '$lib/server/db';
import { contactSubmissions, orders, repairBookings } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { and, count, desc, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const today = new Date().toISOString().slice(0, 10);

	const [orderStats] = await db
		.select({
			totalOrders: count(),
			revenue: sql<number>`coalesce(sum(${orders.totalAmount}), 0)`,
			pendingOrders: sql<number>`coalesce(sum(case when ${orders.status} = 'pending' then 1 else 0 end), 0)`
		})
		.from(orders);

	const [bookingStats] = await db
		.select({ bookingsToday: count() })
		.from(repairBookings)
		.where(eq(repairBookings.preferredDate, today));

	const [contactStats] = await db
		.select({ unreadContacts: count() })
		.from(contactSubmissions)
		.where(eq(contactSubmissions.isRead, 0));

	const recentOrders = await db
		.select({
			id: orders.id,
			orderNumber: orders.orderNumber,
			customerName: orders.customerName,
			status: orders.status,
			fulfillmentType: orders.fulfillmentType,
			totalAmount: orders.totalAmount,
			createdAt: orders.createdAt
		})
		.from(orders)
		.orderBy(desc(orders.createdAt))
		.limit(10);

	return {
		summary: {
			totalOrders: Number(orderStats.totalOrders),
			revenue: Number(orderStats.revenue),
			pendingOrders: Number(orderStats.pendingOrders),
			bookingsToday: Number(bookingStats.bookingsToday),
			unreadContacts: Number(contactStats.unreadContacts)
		},
		recentOrders: recentOrders.map((order) => ({
			...order,
			createdAt: order.createdAt.toISOString()
		}))
	};
};
