<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

	let {
		products,
		images = {}
	}: {
		products: Array<{
			id: number;
			name: string;
			nameEn?: string | null;
			description?: string | null;
			descriptionEn?: string | null;
			price: number;
			status: string;
			qualityTier: string;
			modelSeries?: string | null;
			warrantyMonths: number;
			condition?: string | null;
		}>;
		images?: Record<number, string>;
	} = $props();
</script>

{#if products.length === 0}
	<div class="py-16 text-center">
		<p class="font-body text-gray-500">
			{#if true}Keine Geräte verfügbar{/if}
		</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each products as product}
			<ProductCard {product} image={images[product.id]} />
		{/each}
	</div>
{/if}
