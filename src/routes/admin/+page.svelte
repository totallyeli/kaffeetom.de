<script lang="ts">
	import { formatPrice, orderStatusLabels, fulfillmentTypeLabels } from '$lib/config';

	let { data } = $props();

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
		<div>
			<h2 class="font-serif text-3xl text-primary">Dashboard</h2>
			<p class="mt-1 text-sm text-gray-500">Aktuelle Kennzahlen für den Shopbetrieb.</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Bestellungen gesamt</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.totalOrders}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Umsatz</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{formatPrice(data.summary.revenue)}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Offene Bestellungen</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.pendingOrders}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Termine heute</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.bookingsToday}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Ungelesene Anfragen</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.unreadContacts}</p>
			</div>
		</div>

		<div class="rounded-xl border border-gray-100 bg-white shadow-sm">
			<div class="border-b border-gray-100 px-5 py-4">
				<h3 class="font-serif text-xl text-primary">Letzte 10 Bestellungen</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="bg-gray-50 text-left text-xs text-gray-500 uppercase">
						<tr>
							<th class="px-4 py-3">Nummer</th>
							<th class="px-4 py-3">Kunde</th>
							<th class="px-4 py-3">Status</th>
							<th class="px-4 py-3">Typ</th>
							<th class="px-4 py-3">Betrag</th>
							<th class="px-4 py-3">Datum</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.recentOrders.length === 0}
							<tr>
								<td colspan="6" class="px-4 py-6 text-center text-gray-500">
									Noch keine Bestellungen vorhanden.
								</td>
							</tr>
						{:else}
							{#each data.recentOrders as order}
								<tr class="hover:bg-gray-50">
									<td class="px-4 py-3 font-medium text-gray-900">
										<a href={`/admin/orders/${order.id}`} class="hover:text-primary"
											>{order.orderNumber}</a
										>
									</td>
									<td class="px-4 py-3 text-gray-700">{order.customerName}</td>
									<td class="px-4 py-3 text-gray-700"
										>{orderStatusLabels[order.status] ?? order.status}</td
									>
									<td class="px-4 py-3 text-gray-700"
										>{fulfillmentTypeLabels[order.fulfillmentType] ?? order.fulfillmentType}</td
									>
									<td class="px-4 py-3 text-gray-700">{formatPrice(order.totalAmount)}</td>
									<td class="px-4 py-3 text-gray-500">{formatDate(order.createdAt)}</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
