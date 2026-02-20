import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	signUpEmail: async ({ request, url }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!name || !email || !password) {
			return fail(400, { message: 'Bitte füllen Sie alle Felder aus.' });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name,
					email,
					password
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registrierung fehlgeschlagen' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		throw redirect(303, url.searchParams.get('redirect') || '/konto');
	}
} satisfies Actions;
