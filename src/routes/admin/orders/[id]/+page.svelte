<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPrice, orderStatusLabels } from '$lib/config';

	let { data, form } = $props();

	let selectedAction = $state('markInProcess');

	const actionOptions = [
		{ value: 'markInProcess', label: 'In Bearbeitung setzen' },
		{ value: 'markFulfilled', label: 'Als abgeschlossen markieren' },
		{ value: 'markShipped', label: 'Als versendet markieren' },
		{ value: 'markCancelled', label: 'Stornieren' },
		{ value: 'markRefunded', label: 'Erstattung durchführen' }
	];

	function formatDate(iso: string | null): string {
		if (!iso) return '-';
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
				<h2 class="font-serif text-3xl text-primary">Bestellung {data.order.orderNumber}</h2>
				<p class="mt-1 text-sm text-gray-500">Status aktualisieren und Positionen prüfen.</p>
			</div>
			<a
				href="/admin/orders"
				class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
			>
				Zur Liste
			</a>
		</div>

		{#if form?.error}
			<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<div class="grid gap-6 lg:grid-cols-3">
			<div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
				<h3 class="font-serif text-xl text-primary">Bestelldaten</h3>
				<div class="mt-4 grid gap-3 sm:grid-cols-2">
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Kunde</p>
						<p class="text-sm text-gray-800">{data.order.customerName}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Status</p>
						<p class="text-sm text-gray-800">
							{orderStatusLabels[data.order.status] ?? data.order.status}
						</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Erstellt</p>
						<p class="text-sm text-gray-800">{formatDate(data.order.createdAt)}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Bezahlt</p>
						<p class="text-sm text-gray-800">{formatDate(data.order.paidAt)}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Erfüllt</p>
						<p class="text-sm text-gray-800">{formatDate(data.order.fulfilledAt)}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Versendet</p>
						<p class="text-sm text-gray-800">{formatDate(data.order.shippedAt)}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Versandkosten</p>
						<p class="text-sm text-gray-800">{formatPrice(data.order.shippingCost)}</p>
					</div>
					<div>
						<p class="text-xs tracking-wide text-gray-500 uppercase">Gesamtbetrag</p>
						<p class="text-sm font-semibold text-gray-900">{formatPrice(data.order.totalAmount)}</p>
					</div>
				</div>
			</div>

			<div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
				<h3 class="font-serif text-xl text-primary">Status setzen</h3>
				<form method="POST" action={`?/${selectedAction}`} use:enhance class="mt-4 space-y-3">
					<input type="hidden" name="orderId" value={data.order.id} />
					<select
						bind:value={selectedAction}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-0"
					>
						{#each actionOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
					<button
						type="submit"
						class="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
					>
						Status aktualisieren
					</button>
				</form>
			</div>
		</div>

		<div class="rounded-xl border border-gray-100 bg-white shadow-sm">
			<div class="border-b border-gray-100 px-5 py-4">
				<h3 class="font-serif text-xl text-primary">Artikel</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="bg-gray-50 text-left text-xs text-gray-500 uppercase">
						<tr>
							<th class="px-4 py-3">Produkt</th>
							<th class="px-4 py-3">Menge</th>
							<th class="px-4 py-3">Einzelpreis</th>
							<th class="px-4 py-3">Summe</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.items.length === 0}
							<tr>
								<td colspan="4" class="px-4 py-6 text-center text-gray-500">
									Keine Artikel gefunden.
								</td>
							</tr>
						{:else}
							{#each data.items as item}
								<tr>
									<td class="px-4 py-3 font-medium text-gray-900">{item.productName}</td>
									<td class="px-4 py-3 text-gray-700">{item.quantity}</td>
									<td class="px-4 py-3 text-gray-700">{formatPrice(item.unitPrice)}</td>
									<td class="px-4 py-3 text-gray-700"
										>{formatPrice(item.unitPrice * item.quantity)}</td
									>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
