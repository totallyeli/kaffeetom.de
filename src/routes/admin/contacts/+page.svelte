<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function preview(message: string | null): string {
		if (!message) return '-';
		return message.length > 90 ? `${message.slice(0, 90)}...` : message;
	}
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-7xl space-y-6">
		<div>
			<h2 class="font-serif text-3xl text-primary">Kontaktanfragen</h2>
			<p class="mt-1 text-sm text-gray-500">Nachrichten lesen und als gelesen markieren.</p>
		</div>

		{#if form?.error}
			<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<div class="rounded-xl border border-gray-100 bg-white shadow-sm">
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="bg-gray-50 text-left text-xs text-gray-500 uppercase">
						<tr>
							<th class="px-4 py-3">Typ</th>
							<th class="px-4 py-3">Name</th>
							<th class="px-4 py-3">E-Mail</th>
							<th class="px-4 py-3">Nachricht</th>
							<th class="px-4 py-3">Gelesen</th>
							<th class="px-4 py-3">Datum</th>
							<th class="px-4 py-3">Bilder</th>
							<th class="px-4 py-3">Aktion</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.contacts.length === 0}
							<tr>
								<td colspan="8" class="px-4 py-6 text-center text-gray-500">
									Keine Kontakte vorhanden.
								</td>
							</tr>
						{:else}
							{#each data.contacts as contact}
								<tr>
									<td class="px-4 py-3 text-gray-700">{contact.type}</td>
									<td class="px-4 py-3 font-medium text-gray-900">
										{contact.firstName}
										{contact.lastName}
									</td>
									<td class="px-4 py-3 text-gray-700">{contact.email}</td>
									<td class="px-4 py-3 text-gray-700">{preview(contact.message)}</td>
									<td class="px-4 py-3 text-gray-700">{contact.isRead ? 'Ja' : 'Nein'}</td>
									<td class="px-4 py-3 text-gray-500">{formatDate(contact.createdAt)}</td>
									<td class="px-4 py-3">
										{#if contact.images.length > 0}
											<div class="flex flex-wrap gap-2">
												{#each contact.images as image}
													<a href={image.url} target="_blank" rel="noreferrer" class="block">
														<img
															src={image.url}
															alt={image.name ?? 'Bild'}
															class="h-10 w-10 rounded-md border border-gray-200 object-cover"
														/>
													</a>
												{/each}
											</div>
										{:else}
											<span class="text-gray-400">-</span>
										{/if}
									</td>
									<td class="px-4 py-3">
										{#if !contact.isRead}
											<form method="POST" action="?/markRead" use:enhance>
												<input type="hidden" name="id" value={contact.id} />
												<button
													type="submit"
													class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary"
												>
													Als gelesen
												</button>
											</form>
										{:else}
											<span class="text-xs text-emerald-700">Erledigt</span>
										{/if}
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
