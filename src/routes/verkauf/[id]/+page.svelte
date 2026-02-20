<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { formatPrice } from '$lib/config';
	import { cart } from '$lib/stores/cart.svelte';

	let { data } = $props();

	const product = data.product;
	const images = data.images;

	const locale = $derived(getLocale());
	const displayName = $derived(locale === 'en' && product.nameEn ? product.nameEn : product.name);
	const displayDescription = $derived(
		locale === 'en' && product.descriptionEn ? product.descriptionEn : product.description
	);
	const isAvailable = product.status === 'available';
	const isPremium = product.qualityTier === 'premium';
	const primaryImage = images[0]?.url ?? null;

	let selectedImageIndex = $state(0);
	let selectedImage = $derived(images[selectedImageIndex]?.url ?? primaryImage);

	function handleAddToCart() {
		cart.addItem({
			productId: product.id,
			name: product.name,
			nameEn: product.nameEn ?? undefined,
			price: product.price,
			image: primaryImage ?? '/uploads/products/placeholder.webp'
		});
	}
</script>

<svelte:head>
	<title>{displayName} | KAFFEETOM</title>
	<meta
		name="description"
		content={displayDescription ?? `${displayName} - ${formatPrice(product.price)}`}
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-4 pt-24 pb-16 md:pt-28 md:pb-24">
	<a
		href={localizeHref(isPremium ? '/premium' : '/verkauf')}
		class="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-gray-500 transition-colors hover:text-primary"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
			/>
		</svg>
		{m.back()}
	</a>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
		<div>
			<div class="relative overflow-hidden rounded-xl bg-cream-dark">
				{#if selectedImage}
					<img src={selectedImage} alt={displayName} class="aspect-square w-full object-cover" />
				{:else}
					<div class="flex aspect-square w-full items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-24 w-24 text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				{/if}

				{#if !isAvailable}
					<div class="absolute inset-0 flex items-center justify-center bg-black/40">
						<span
							class="rounded-full bg-white px-6 py-2 font-body text-base font-bold text-gray-900"
						>
							{product.status === 'sold' ? m.sold() : m.reserved()}
						</span>
					</div>
				{/if}

				{#if isPremium}
					<span
						class="absolute top-4 left-4 rounded-full bg-copper px-4 py-1.5 font-body text-sm font-bold text-white"
					>
						Premium
					</span>
				{/if}
			</div>

			{#if images.length > 1}
				<div class="mt-3 flex gap-2 overflow-x-auto pb-1">
					{#each images as img, i}
						<button
							type="button"
							onclick={() => (selectedImageIndex = i)}
							class="shrink-0 overflow-hidden rounded-lg border-2 transition-all {i ===
							selectedImageIndex
								? 'border-primary shadow-sm'
								: 'border-transparent opacity-70 hover:opacity-100'}"
						>
							<img
								src={img.url}
								alt={`${displayName} ${i + 1}`}
								class="h-16 w-16 object-cover sm:h-20 sm:w-20"
								loading="lazy"
							/>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex flex-col">
			{#if product.modelSeries}
				<span
					class="inline-block w-fit rounded bg-copper/10 px-2.5 py-1 font-body text-xs font-semibold tracking-wide text-copper uppercase"
				>
					{product.modelSeries}-Serie
				</span>
			{/if}

			<h1 class="mt-2 font-display text-3xl font-bold text-coffee md:text-4xl">
				{displayName}
			</h1>

			<div class="mt-4 flex items-baseline gap-3">
				<p class="font-display text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
				<p class="font-body text-xs text-gray-400">{m.price_incl_tax()}</p>
			</div>

			{#if product.condition}
				<div class="mt-4 flex items-center gap-2">
					<span class="font-body text-sm text-gray-500">
						{locale === 'de' ? 'Zustand' : 'Condition'}:
					</span>
					<span class="font-body text-sm font-medium text-coffee">{product.condition}</span>
				</div>
			{/if}

			<div class="mt-2 flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-copper"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
					/>
				</svg>
				<p class="font-body text-sm text-gray-600">
					{m.warranty_months({ months: String(product.warrantyMonths) })}
				</p>
			</div>

			{#if displayDescription}
				<div class="mt-6 border-t border-gray-100 pt-6">
					<p class="font-body leading-relaxed text-gray-600">{displayDescription}</p>
				</div>
			{/if}

			<div class="mt-8">
				{#if isAvailable}
					<button
						onclick={handleAddToCart}
						class="w-full rounded-lg bg-primary px-6 py-3.5 font-body text-base font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto sm:min-w-[200px]"
					>
						{m.add_to_cart()}
					</button>
				{:else}
					<div
						class="rounded-lg border border-gray-200 bg-gray-50 px-6 py-3.5 text-center font-body text-sm font-medium text-gray-500"
					>
						{product.status === 'sold' ? m.sold() : m.reserved()}
					</div>
				{/if}
			</div>

			<div class="mt-8 rounded-xl border border-copper/20 bg-copper/5 p-5">
				<p class="font-body text-sm text-gray-600">{m.products_availability()}</p>
				<p class="mt-2 font-body text-sm text-gray-600">{m.products_transfer()}</p>
			</div>
		</div>
	</div>
</section>
