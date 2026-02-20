<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { dayNames, isLocationOpenNow, type Location } from '$lib/config';

	let { location }: { location: Location } = $props();

	const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
	let isOpen = $derived(isLocationOpenNow(location));

	function getDayName(day: string): string {
		const locale = getLocale();
		const entry = dayNames[day];
		if (!entry) return day;
		return locale === 'en' ? entry.en : entry.de;
	}

	function formatHours(hours: { open: string; close: string }[] | null): string {
		if (!hours) return m.closed();
		return hours.map((h) => `${h.open} – ${h.close}`).join(', ');
	}
</script>

<div
	class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
>
	<div class="mb-4 flex items-center justify-between">
		<h3 class="font-display text-xl font-bold text-coffee">{location.name}</h3>
		<span
			class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-body text-xs font-medium {isOpen
				? 'border-emerald-200 bg-emerald-50 text-emerald-700'
				: 'border-red-200 bg-red-50 text-red-700'}"
		>
			<span class="h-1.5 w-1.5 rounded-full {isOpen ? 'bg-emerald-500' : 'bg-red-500'}"></span>
			{isOpen ? m.location_open_now() : m.location_closed_now()}
		</span>
	</div>

	<div class="space-y-3">
		<div class="flex items-start gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mt-0.5 h-5 w-5 shrink-0 text-primary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
				/>
			</svg>
			<div>
				<p class="font-body text-sm text-gray-700">{location.address}</p>
				<p class="font-body text-sm text-gray-700">{location.zip} {location.city}</p>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 shrink-0 text-primary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
				/>
			</svg>
			<a
				href="tel:{location.phone.replace(/[\s/]/g, '')}"
				class="font-body text-sm text-gray-700 transition-colors hover:text-primary"
			>
				{location.phone}
			</a>
		</div>

		<div class="flex items-center gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 shrink-0 text-primary"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
				/>
			</svg>
			<a
				href="https://wa.me/{location.whatsapp}"
				target="_blank"
				rel="noopener noreferrer"
				class="font-body text-sm text-gray-700 transition-colors hover:text-primary"
			>
				WhatsApp
			</a>
		</div>

		<a
			href={location.googleMapsUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1 font-body text-xs text-primary transition-colors hover:text-primary-dark"
		>
			{m.footer_maps_hint()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3 w-3"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
				/>
			</svg>
		</a>
	</div>

	<div class="mt-4 border-t border-gray-100 pt-4">
		<h4 class="mb-2 font-body text-xs font-semibold tracking-wider text-primary uppercase">
			{m.footer_hours()}
		</h4>
		<div class="space-y-1">
			{#each dayOrder as day}
				<div class="flex justify-between font-body text-xs text-gray-600">
					<span>{getDayName(day)}</span>
					<span
						>{formatHours(
							location.openingHours[day] as { open: string; close: string }[] | null
						)}</span
					>
				</div>
			{/each}
		</div>
	</div>
</div>
