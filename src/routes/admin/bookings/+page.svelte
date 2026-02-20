<script lang="ts">
	import { enhance } from '$app/forms';
	import { locations, serviceTypeLabels, bookingStatusLabels } from '$lib/config';

	let { data, form } = $props();

	const locationMap = Object.fromEntries(locations.map((location) => [location.id, location.name]));

	function locationLabel(id: number): string {
		const key = String(id);
		return locationMap[key] ?? key;
	}

	function serviceLabel(id: string): string {
		return serviceTypeLabels[id] ?? id;
	}

	function statusLabel(status: string): string {
		return bookingStatusLabels[status] ?? status;
	}
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-7xl space-y-6">
		<div>
			<h2 class="font-serif text-3xl text-primary">Service-Termine</h2>
			<p class="mt-1 text-sm text-gray-500">Termine abschließen oder stornieren.</p>
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
							<th class="px-4 py-3">Kunde</th>
							<th class="px-4 py-3">Service</th>
							<th class="px-4 py-3">Standort</th>
							<th class="px-4 py-3">Datum</th>
							<th class="px-4 py-3">Zeitfenster</th>
							<th class="px-4 py-3">Status</th>
							<th class="px-4 py-3">Aktionen</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.bookings.length === 0}
							<tr>
								<td colspan="7" class="px-4 py-6 text-center text-gray-500">
									Keine Buchungen gefunden.
								</td>
							</tr>
						{:else}
							{#each data.bookings as booking}
								<tr>
									<td class="px-4 py-3 font-medium text-gray-900">{booking.customerName}</td>
									<td class="px-4 py-3 text-gray-700">{serviceLabel(booking.serviceType)}</td>
									<td class="px-4 py-3 text-gray-700">{locationLabel(booking.locationId)}</td>
									<td class="px-4 py-3 text-gray-700">{booking.preferredDate}</td>
									<td class="px-4 py-3 text-gray-700">{booking.preferredTimeSlot}</td>
									<td class="px-4 py-3 text-gray-700">{statusLabel(booking.status)}</td>
									<td class="px-4 py-3">
										<div class="flex gap-2">
											<form method="POST" action="?/markCompleted" use:enhance>
												<input type="hidden" name="id" value={booking.id} />
												<button
													type="submit"
													class="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
												>
													Abschließen
												</button>
											</form>
											<form method="POST" action="?/cancel" use:enhance>
												<input type="hidden" name="id" value={booking.id} />
												<button
													type="submit"
													class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
												>
													Stornieren
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
