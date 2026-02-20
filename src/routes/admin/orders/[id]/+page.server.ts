import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { orderItems, orders } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

async function updateOrderStatus(
	orderId: number,
	status: 'in_process' | 'fulfilled' | 'shipped' | 'cancelled' | 'refunded'
) {
	const updates: {
		status: 'in_process' | 'fulfilled' | 'shipped' | 'cancelled' | 'refunded';
		fulfilledAt?: Date | null;
		shippedAt?: Date | null;
		cancellationRequestedAt?: Date | null;
	} = { status };

	if (status === 'fulfilled') {
		updates.fulfilledAt = new Date();
	}
	if (status === 'shipped') {
		updates.shippedAt = new Date();
	}
	if (status === 'cancelled' || status === 'refunded') {
		updates.cancellationRequestedAt = null;
	}

	await db.update(orders).set(updates).where(eq(orders.id, orderId));
}

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);
	const id = Number.parseInt(event.params.id, 10);

	if (!Number.isInteger(id) || id <= 0) {
		error(404, 'Bestellung nicht gefunden.');
	}

	const [order] = await db.select().from(orders).where(eq(orders.id, id));
	if (!order) {
		error(404, 'Bestellung nicht gefunden.');
	}

	const items = await db
		.select({
			id: orderItems.id,
			productName: orderItems.productName,
			quantity: orderItems.quantity,
			unitPrice: orderItems.unitPrice,
			createdAt: orderItems.createdAt
		})
		.from(orderItems)
		.where(eq(orderItems.orderId, id));

	return {
		order: {
			...order,
			createdAt: order.createdAt.toISOString(),
			paidAt: order.paidAt?.toISOString() ?? null,
			fulfilledAt: order.fulfilledAt?.toISOString() ?? null,
			shippedAt: order.shippedAt?.toISOString() ?? null,
			cancellationRequestedAt: order.cancellationRequestedAt?.toISOString() ?? null
		},
		items: items.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))
	};
};

export const actions: Actions = {
	markInProcess: async (event) => {
		requireAdmin(event);
		const orderId = Number.parseInt(
			String((await event.request.formData()).get('orderId') ?? ''),
			10
		);
		if (!Number.isInteger(orderId) || orderId <= 0) {
			return fail(400, { error: 'Ungultige Bestellung.' });
		}
		await updateOrderStatus(orderId, 'in_process');
		return { success: true };
	},
	markFulfilled: async (event) => {
		requireAdmin(event);
		const orderId = Number.parseInt(
			String((await event.request.formData()).get('orderId') ?? ''),
			10
		);
		if (!Number.isInteger(orderId) || orderId <= 0) {
			return fail(400, { error: 'Ungultige Bestellung.' });
		}
		await updateOrderStatus(orderId, 'fulfilled');
		return { success: true };
	},
	markShipped: async (event) => {
		requireAdmin(event);
		const orderId = Number.parseInt(
			String((await event.request.formData()).get('orderId') ?? ''),
			10
		);
		if (!Number.isInteger(orderId) || orderId <= 0) {
			return fail(400, { error: 'Ungultige Bestellung.' });
		}
		await updateOrderStatus(orderId, 'shipped');
		return { success: true };
	},
	markCancelled: async (event) => {
		requireAdmin(event);
		const orderId = Number.parseInt(
			String((await event.request.formData()).get('orderId') ?? ''),
			10
		);
		if (!Number.isInteger(orderId) || orderId <= 0) {
			return fail(400, { error: 'Ungultige Bestellung.' });
		}
		await updateOrderStatus(orderId, 'cancelled');
		return { success: true };
	},
	markRefunded: async (event) => {
		requireAdmin(event);
		const orderId = Number.parseInt(
			String((await event.request.formData()).get('orderId') ?? ''),
			10
		);
		if (!Number.isInteger(orderId) || orderId <= 0) {
			return fail(400, { error: 'Ungultige Bestellung.' });
		}
		await updateOrderStatus(orderId, 'refunded');
		return { success: true };
	}
};
