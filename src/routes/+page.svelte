<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import Hero from '$lib/components/Hero.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import { businessInfo } from '$lib/config';

	let { data } = $props();

	const yearsActive = new Date().getFullYear() - businessInfo.since;
</script>

<Hero
	title={m.hero_title()}
	subtitle={m.hero_subtitle()}
	cta={{ label: m.hero_cta(), href: '/verkauf' }}
/>

<section class="mx-auto max-w-6xl px-4 py-16 md:py-24">
	<h2 class="mb-4 text-center font-display text-3xl font-bold text-coffee md:text-4xl">
		{m.home_welcome_title()}
	</h2>
	<div class="mx-auto max-w-3xl space-y-4 text-center font-body text-gray-600">
		<p>{m.home_welcome_text()}</p>
		<p>{m.home_welcome_text2()}</p>
		<p class="font-medium text-coffee">{m.home_welcome_text3()}</p>
	</div>
</section>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-4xl px-4">
		<h2 class="mb-6 text-center font-display text-3xl font-bold text-coffee md:text-4xl">
			{m.about_title()}
		</h2>
		<p class="mx-auto mb-10 max-w-2xl text-center font-body text-lg leading-relaxed text-gray-600">
			{m.about_text()}
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<div class="rounded-xl border border-gray-100 bg-cream/50 p-6 text-center shadow-sm">
				<p class="font-display text-4xl font-bold text-primary">{yearsActive}+</p>
				<p class="mt-2 font-body text-sm text-gray-500">{m.about_years_experience()}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-cream/50 p-6 text-center shadow-sm">
				<p class="font-display text-4xl font-bold text-copper">2</p>
				<p class="mt-2 font-body text-sm text-gray-500">{m.about_locations_count()}</p>
			</div>
			<div class="rounded-xl border border-gray-100 bg-cream/50 p-6 text-center shadow-sm">
				<p class="font-display text-4xl font-bold text-coffee">{businessInfo.warrantyMonths}</p>
				<p class="mt-2 font-body text-sm text-gray-500">
					{m.warranty_months({ months: String(businessInfo.warrantyMonths) })}
				</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16 md:py-24">
	<h2 class="mb-10 text-center font-display text-3xl font-bold text-coffee md:text-4xl">
		{m.home_services_title()}
	</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<a
			href={localizeHref('/verkauf')}
			class="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-primary"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 font-display text-xl font-bold text-coffee">{m.nav_products()}</h3>
			<p class="font-body text-sm text-gray-600">{m.products_warranty()}</p>
		</a>

		<a
			href={localizeHref('/reparatur')}
			class="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div class="mb-4 inline-flex rounded-lg bg-copper/10 p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-copper"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.867 19.125h.008v.008h-.008v-.008Z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 font-display text-xl font-bold text-coffee">{m.nav_repair()}</h3>
			<p class="font-body text-sm text-gray-600">{m.repair_from_price()}</p>
		</a>

		<a
			href={localizeHref('/ankauf')}
			class="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div class="mb-4 inline-flex rounded-lg bg-success/10 p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-success"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 font-display text-xl font-bold text-coffee">{m.nav_buyback()}</h3>
			<p class="font-body text-sm text-gray-600">{m.buyback_text()}</p>
		</a>
	</div>
</section>
