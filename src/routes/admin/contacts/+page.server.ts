import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { contactSubmissions } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/admin-guard';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

type ContactImage = { url: string; name?: string };

function normalizeImages(images: unknown): ContactImage[] {
	if (!Array.isArray(images)) return [];
	return images
		.filter(
			(entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null
		)
		.map((entry) => ({
			url: typeof entry.url === 'string' ? entry.url : '',
			name: typeof entry.name === 'string' ? entry.name : undefined
		}))
		.filter((entry) => entry.url.length > 0);
}

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);

	const contacts = await db
		.select({
			id: contactSubmissions.id,
			type: contactSubmissions.type,
			firstName: contactSubmissions.firstName,
			lastName: contactSubmissions.lastName,
			email: contactSubmissions.email,
			message: contactSubmissions.message,
			isRead: contactSubmissions.isRead,
			images: contactSubmissions.images,
			createdAt: contactSubmissions.createdAt
		})
		.from(contactSubmissions)
		.orderBy(desc(contactSubmissions.createdAt));

	return {
		contacts: contacts.map((contact) => ({
			...contact,
			isRead: contact.isRead === 1,
			images: normalizeImages(contact.images),
			createdAt: contact.createdAt.toISOString()
		}))
	};
};

export const actions: Actions = {
	markRead: async (event) => {
		requireAdmin(event);
		const id = Number.parseInt(String((await event.request.formData()).get('id') ?? ''), 10);
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { error: 'Ungultige Anfrage.' });
		}

		await db.update(contactSubmissions).set({ isRead: 1 }).where(eq(contactSubmissions.id, id));
		return { success: true };
	}
};
