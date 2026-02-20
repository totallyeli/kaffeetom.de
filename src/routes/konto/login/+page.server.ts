import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth';
import type { Actions } from './$types';

export const actions: Actions = {
	signInEmail: async ({ request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		if (!email || !password) {
			return fail(400, { message: 'Bitte füllen Sie alle Felder aus.' });
		}

		try {
			await auth.api.signInEmail({
				body: { email, password }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Anmeldung fehlgeschlagen' });
			}
			return fail(500, { message: 'Unerwarteter Fehler' });
		}

		const redirectTo = url.searchParams.get('redirect') || '/konto';
		redirect(302, redirectTo);
	},

	signInSocial: async ({ request, url }) => {
		const formData = await request.formData();
		const provider = formData.get('provider')?.toString() ?? 'github';
		const callbackURL = url.searchParams.get('redirect') || '/konto';

		const result = await auth.api.signInSocial({
			body: {
				provider: provider as 'github',
				callbackURL
			}
		});

		if (result.url) {
			redirect(302, result.url);
		}

		return fail(400, { message: 'Anmeldung fehlgeschlagen' });
	}
};
