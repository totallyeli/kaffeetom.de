import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const orderNumber = url.searchParams.get('id')?.trim().toUpperCase();

	if (orderNumber) {
		redirect(302, `/konto/bestellungen/${orderNumber}`);
	}

	redirect(302, '/konto');
};
