<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPrice } from '$lib/config';

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
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-7xl space-y-6">
		<div class="flex items-center justify-between gap-4">
			<div>
				<h2 class="font-serif text-3xl text-primary">Produkte</h2>
				<p class="mt-1 text-sm text-gray-500">Alle Produkte verwalten und aktualisieren.</p>
			</div>
			<a
				href="/admin/products/new"
				class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
			>
				Neues Produkt
			</a>
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
							<th class="px-4 py-3">Name</th>
							<th class="px-4 py-3">Preis</th>
							<th class="px-4 py-3">Status</th>
							<th class="px-4 py-3">Qualitat</th>
							<th class="px-4 py-3">Serie</th>
							<th class="px-4 py-3">Stripe Price ID</th>
							<th class="px-4 py-3">Aktualisiert</th>
							<th class="px-4 py-3">Aktionen</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.products.length === 0}
							<tr>
								<td colspan="8" class="px-4 py-6 text-center text-gray-500">
									Keine Produkte gefunden.
								</td>
							</tr>
						{:else}
							{#each data.products as product}
								<tr class="hover:bg-gray-50">
									<td class="px-4 py-3 font-medium text-gray-900">{product.name}</td>
									<td class="px-4 py-3 text-gray-700">{formatPrice(product.price)}</td>
									<td class="px-4 py-3 text-gray-700">{product.status}</td>
									<td class="px-4 py-3 text-gray-700">{product.qualityTier}</td>
									<td class="px-4 py-3 text-gray-700">{product.modelSeries ?? '-'}</td>
									<td class="px-4 py-3 text-gray-700">{product.stripePriceId ?? '-'}</td>
									<td class="px-4 py-3 text-gray-500">{formatDate(product.updatedAt)}</td>
									<td class="px-4 py-3">
										<div class="flex items-center gap-2">
											<a
												href={`/admin/products/${product.id}`}
												class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary"
											>
												Bearbeiten
											</a>
											<form method="POST" action="?/delete" use:enhance>
												<input type="hidden" name="id" value={product.id} />
												<button
													type="submit"
													class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
												>
													Loschen
												</button>
											</form>
										</div>
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
