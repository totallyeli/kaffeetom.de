import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { desc, eq } from 'drizzle-orm';
import { orderStatuses } from '$lib/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const statusFilter = event.url.searchParams.get('status')?.trim() ?? '';
	const selectedStatus = orderStatuses.includes(statusFilter as (typeof orderStatuses)[number])
		? statusFilter
		: '';

	const query = db
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
		.orderBy(desc(orders.createdAt));

	const allOrders = selectedStatus
		? await query.where(eq(orders.status, selectedStatus))
		: await query;

	return {
		selectedStatus,
		orderStatuses,
		orders: allOrders.map((order) => ({
			...order,
			createdAt: order.createdAt.toISOString()
		}))
	};
};
