<script lang="ts">
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
			<h2 class="font-serif text-3xl text-primary">Analytics</h2>
			<p class="mt-1 text-sm text-gray-500">Page-View-Statistik und letzte Besucherzugriffe.</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Gesamtaufrufe</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.totalViews}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<p class="text-xs tracking-wide text-gray-500 uppercase">Eindeutige Besucher</p>
				<p class="mt-2 text-2xl font-semibold text-gray-900">{data.summary.uniqueVisitors}</p>
			</div>
		</div>

		<div class="rounded-xl border border-gray-100 bg-white shadow-sm">
			<div class="border-b border-gray-100 px-5 py-4">
				<h3 class="font-serif text-xl text-primary">Letzte Seitenaufrufe</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="bg-gray-50 text-left text-xs text-gray-500 uppercase">
						<tr>
							<th class="px-4 py-3">Zeitpunkt</th>
							<th class="px-4 py-3">Landing Page</th>
							<th class="px-4 py-3">Visitor ID</th>
							<th class="px-4 py-3">IP</th>
							<th class="px-4 py-3">Referer</th>
							<th class="px-4 py-3">Locale</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#if data.recentViews.length === 0}
							<tr>
								<td colspan="6" class="px-4 py-6 text-center text-gray-500">
									Keine Daten vorhanden.
								</td>
							</tr>
						{:else}
							{#each data.recentViews as view}
								<tr>
									<td class="px-4 py-3 text-gray-500">{formatDate(view.createdAt)}</td>
									<td class="px-4 py-3 font-medium text-gray-900">{view.landingPage}</td>
									<td class="px-4 py-3 text-gray-700">{view.visitorId ?? '-'}</td>
									<td class="px-4 py-3 text-gray-700">{view.ipAddress}</td>
									<td class="max-w-[260px] truncate px-4 py-3 text-gray-700">
										{view.referer ?? '-'}
									</td>
									<td class="px-4 py-3 text-gray-700">{view.locale ?? '-'}</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
