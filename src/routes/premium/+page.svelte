<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Hero from '$lib/components/Hero.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';

	let { data } = $props();
</script>

<Hero title={m.premium_title()} subtitle={m.premium_subtitle()} />

<section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
	<div
		class="mb-8 rounded-xl border border-copper/30 bg-gradient-to-r from-copper/5 to-copper/10 p-6"
	>
		<p class="font-body text-sm text-gray-700">{m.premium_description()}</p>
	</div>

	<ProductGrid products={data.products} images={data.imageMap} />
</section>
