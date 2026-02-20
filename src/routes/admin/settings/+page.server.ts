import { fail } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/admin-guard';
import {
	getStoreSettings,
	setShippingConfig,
	setShopEnabled,
	setStoreMode
} from '$lib/server/store-status';
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
	const settings = await getStoreSettings();
	return { settings };
};

export const actions: Actions = {
	setMode: async (event) => {
		requireAdmin(event);
		const formData = await event.request.formData();
		const mode = String(formData.get('mode') ?? 'auto');
		const open = String(formData.get('open') ?? '0') === '1';
		const closedMessage = String(formData.get('closedMessage') ?? '').trim();

		if (mode !== 'auto' && mode !== 'manual') {
			return fail(400, { error: 'Ungultiger Modus.' });
		}

		await setStoreMode(mode, open, closedMessage || null);
		return { success: true };
	},
	setShopEnabled: async (event) => {
		requireAdmin(event);
		const formData = await event.request.formData();
		const enabled = String(formData.get('shopEnabled') ?? '0') === '1';
		await setShopEnabled(enabled);
		return { success: true };
	},
	setShipping: async (event) => {
		requireAdmin(event);
		const formData = await event.request.formData();
		const shippingFlatRate = parseEuroToCents(formData.get('shippingFlatRate'));
		const shippingFreeThreshold = parseEuroToCents(formData.get('shippingFreeThreshold'));

		if (!Number.isInteger(shippingFlatRate) || shippingFlatRate < 0) {
			return fail(400, { error: 'Ungultiger Versandpauschale-Wert.' });
		}

		if (!Number.isInteger(shippingFreeThreshold) || shippingFreeThreshold < 0) {
			return fail(400, { error: 'Ungultiger Versandfrei-Schwellenwert.' });
		}

		await setShippingConfig(shippingFlatRate, shippingFreeThreshold);
		return { success: true };
	}
};
