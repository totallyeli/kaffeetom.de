<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Hero from '$lib/components/Hero.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';

	let { data } = $props();
</script>

<Hero title={m.products_title()} subtitle={m.products_subtitle()} />

<section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
	<div class="mb-8 space-y-3 rounded-xl border border-copper/20 bg-copper/5 p-6">
		<p class="font-body text-sm font-medium text-copper">{m.products_warranty()}</p>
		<p class="font-body text-sm text-gray-600">{m.products_availability()}</p>
		<p class="font-body text-sm text-gray-600">{m.products_transfer()}</p>
	</div>

	<ProductGrid products={data.products} images={data.imageMap} />
</section>
