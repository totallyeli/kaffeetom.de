<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { cart } from '$lib/stores/cart.svelte';
	import { formatPrice } from '$lib/config';

	let { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<div
	class={`fixed inset-0 z-[70] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
	role="dialog"
	aria-modal="true"
	aria-label={m.cart_title()}
>
	<button
		class={`absolute inset-0 bg-black/45 backdrop-blur-[1px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
		onclick={onclose}
		aria-label="Close cart"
		tabindex={open ? 0 : -1}
	></button>

	<aside
		class={`absolute top-0 right-0 h-full w-full max-w-md transform bg-cream shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
	>
		<div class="flex h-full flex-col">
			<div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
				<h2 class="font-display text-2xl font-bold text-primary">
					{m.cart_title()}
				</h2>
				<button
					onclick={onclose}
					class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-white hover:text-primary"
					aria-label="Close cart"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.8"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
				{#if cart.isEmpty}
					<div class="flex h-full items-center justify-center">
						<p class="font-body text-sm text-gray-600">
							{m.cart_empty()}
						</p>
					</div>
				{:else}
					<div class="space-y-3">
						{#each cart.items as item, i}
							<div class="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
								<div class="flex items-start gap-3">
									<img src={item.image} alt={item.name} class="h-16 w-16 rounded-lg object-cover" />
									<div class="min-w-0 flex-1">
										<p class="font-body text-sm font-semibold text-gray-900">
											{item.name}
										</p>
										<p class="font-body text-xs text-copper">
											{formatPrice(item.price)}
										</p>
									</div>
									<button
										onclick={() => cart.removeItem(i)}
										class="rounded-md p-1 text-gray-400 transition-colors hover:bg-cream-dark hover:text-primary"
										aria-label={m.cart_remove()}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.8"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-5-3h4a1 1 0 011 1v2H9V5a1 1 0 011-1z"
											/>
										</svg>
									</button>
								</div>

								<div class="mt-3 flex items-center justify-between">
									<div
										class="flex items-center rounded-lg border border-gray-100 bg-cream-dark p-1"
									>
										<button
											onclick={() => cart.updateQuantity(i, item.quantity - 1)}
											class="flex h-7 w-7 items-center justify-center rounded-md text-lg leading-none text-gray-700 transition-colors hover:bg-white hover:text-primary"
											aria-label="Decrease"
										>
											-
										</button>
										<span class="w-8 text-center font-body text-sm font-semibold text-gray-800"
											>{item.quantity}</span
										>
										<button
											onclick={() => cart.updateQuantity(i, item.quantity + 1)}
											class="flex h-7 w-7 items-center justify-center rounded-md text-lg leading-none text-gray-700 transition-colors hover:bg-white hover:text-primary"
											aria-label="Increase"
										>
											+
										</button>
									</div>

									<p class="font-body text-sm font-bold text-primary">
										{formatPrice(item.price * item.quantity)}
									</p>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="border-t border-gray-100 bg-white px-5 py-4">
				<div class="mb-3 flex items-center justify-between">
					<span class="font-body text-sm text-gray-600">{m.cart_total()}</span>
					<span class="font-display text-xl font-bold text-primary"
						>{formatPrice(cart.totalPrice)}</span
					>
				</div>
				<a
					href={localizeHref('/checkout')}
					class="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
					onclick={onclose}
				>
					{m.cart_checkout()}
				</a>
			</div>
		</div>
	</aside>
</div>
