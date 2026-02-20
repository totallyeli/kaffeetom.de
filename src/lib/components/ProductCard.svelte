<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { formatPrice } from '$lib/config';
	import { cart } from '$lib/stores/cart.svelte';

	let {
		product,
		image
	}: {
		product: {
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
		};
		image?: string;
	} = $props();

	const locale = $derived(getLocale());
	const displayName = $derived(locale === 'en' && product.nameEn ? product.nameEn : product.name);
	const isAvailable = $derived(product.status === 'available');
	const isPremium = $derived(product.qualityTier === 'premium');

	function handleAddToCart() {
		cart.addItem({
			productId: product.id,
			name: product.name,
			nameEn: product.nameEn ?? undefined,
			price: product.price,
			image: image ?? '/uploads/products/placeholder.webp'
		});
	}
</script>

<div
	class="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	<a href={localizeHref(`/verkauf/${product.id}`)} class="block">
		<div class="relative aspect-[4/3] overflow-hidden bg-cream-dark">
			{#if image}
				<img
					src={image}
					alt={displayName}
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					loading="lazy"
				/>
			{:else}
				<div class="flex h-full w-full items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16 text-gray-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			{/if}

			{#if !isAvailable}
				<div class="absolute inset-0 flex items-center justify-center bg-black/40">
					<span class="rounded-full bg-white px-4 py-1.5 font-body text-sm font-bold text-gray-900">
						{product.status === 'sold' ? m.sold() : m.reserved()}
					</span>
				</div>
			{/if}

			{#if isPremium}
				<span
					class="absolute top-3 left-3 rounded-full bg-copper px-3 py-1 font-body text-xs font-bold text-white"
				>
					Premium
				</span>
			{/if}
		</div>
	</a>

	<div class="flex flex-1 flex-col p-4">
		<a href={localizeHref(`/verkauf/${product.id}`)} class="block">
			{#if product.modelSeries}
				<p
					class="inline-block rounded bg-copper/10 px-2 py-0.5 font-body text-xs font-semibold tracking-wide text-copper uppercase"
				>
					{product.modelSeries}-Serie
				</p>
			{/if}
			<h3 class="mt-1 min-h-[3.5rem] font-display text-lg font-bold text-coffee">{displayName}</h3>
		</a>

		<div class="mt-auto pt-3">
			<div class="flex items-center justify-between">
				<div>
					<p class="font-display text-xl font-bold text-primary">{formatPrice(product.price)}</p>
					<p class="font-body text-[10px] text-gray-400">{m.price_incl_tax()}</p>
				</div>
				<p class="font-body text-xs text-gray-500">
					{m.warranty_months({ months: String(product.warrantyMonths) })}
				</p>
			</div>

			{#if isAvailable}
				<button
					onclick={handleAddToCart}
					class="mt-3 w-full rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
				>
					{m.add_to_cart()}
				</button>
			{/if}
		</div>
	</div>
</div>
