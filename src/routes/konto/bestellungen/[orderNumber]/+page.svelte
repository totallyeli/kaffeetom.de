<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatPrice } from '$lib/config';

	let { data } = $props();

	let showCancelModal = $state(false);

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function statusLabel(status: string): string {
		const key = `status_${status}` as keyof typeof m;
		const fn = m[key];
		if (typeof fn === 'function') return (fn as () => string)();
		return status;
	}

	function statusClass(status: string): string {
		switch (status) {
			case 'pending':
				return 'bg-amber-100 text-amber-700 border-amber-200';
			case 'paid':
				return 'bg-blue-100 text-blue-700 border-blue-200';
			case 'in_process':
				return 'bg-purple-100 text-purple-700 border-purple-200';
			case 'fulfilled':
				return 'bg-emerald-100 text-emerald-700 border-emerald-200';
			case 'shipped':
				return 'bg-teal-100 text-teal-700 border-teal-200';
			case 'cancelled':
				return 'bg-gray-100 text-gray-700 border-gray-200';
			case 'refunded':
				return 'bg-red-100 text-red-700 border-red-200';
			case 'cancellation_requested':
				return 'bg-orange-100 text-orange-700 border-orange-200';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-200';
		}
	}

	const canRequestCancellation = $derived(
		data.order && ['paid', 'pending'].includes(data.order.status)
	);
</script>

<section class="bg-cream py-24 md:py-28">
	<div class="container mx-auto max-w-2xl px-4">
		<!-- Back link to dashboard -->
		<a
			href={localizeHref('/konto')}
			class="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			{m.back()}
		</a>

		<!-- Order card (same as existing bestellung detail) -->
		<div class="space-y-4">
			<!-- Order header: orderNumber + status badge -->
			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p class="text-sm text-gray-500">
							{m.account_order_detail_title({ orderNumber: '' })}
						</p>
						<p class="font-serif text-2xl font-bold text-primary">{data.order.orderNumber}</p>
					</div>
					<span
						class="rounded-full border px-3 py-1 text-sm font-medium {statusClass(
							data.order.status
						)}"
					>
						{statusLabel(data.order.status)}
					</span>
				</div>
				<!-- Meta grid: type, date, shipping (if >0), total -->
				<div class="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
					<div>
						<p class="text-xs text-gray-500">Typ</p>
						<p class="mt-0.5 text-sm font-medium text-gray-800">
							{data.order.fulfillmentType === 'pickup'
								? m.checkout_pickup()
								: m.checkout_shipping()}
						</p>
					</div>
					<div>
						<p class="text-xs text-gray-500">Bestellt am</p>
						<p class="mt-0.5 text-sm font-medium text-gray-800">
							{formatDate(data.order.createdAt)}
						</p>
					</div>
					{#if data.order.shippingCost > 0}
						<div>
							<p class="text-xs text-gray-500">{m.checkout_shipping()}</p>
							<p class="mt-0.5 text-sm font-medium text-gray-800">
								{formatPrice(data.order.shippingCost)}
							</p>
						</div>
					{/if}
					<div>
						<p class="text-xs text-gray-500">{m.cart_total()}</p>
						<p class="mt-0.5 font-serif text-lg font-bold text-primary">
							{formatPrice(data.order.totalAmount)}
						</p>
					</div>
				</div>
			</div>

			<!-- Items list (same as bestellung) -->
			{#if data.items.length > 0}
				<div class="rounded-2xl border border-gray-100 bg-white shadow-sm">
					<div class="border-b border-gray-100 px-6 py-4">
						<h2 class="font-serif text-lg text-primary">{m.account_order_items()}</h2>
					</div>
					<div class="divide-y divide-gray-50">
						{#each data.items as item}
							<div class="flex items-center justify-between px-6 py-3">
								<div>
									<p class="text-sm font-medium text-gray-800">{item.productName}</p>
								</div>
								<div class="shrink-0 text-right">
									<p class="text-xs text-gray-500">{item.quantity}x</p>
									<p class="text-sm font-medium whitespace-nowrap text-gray-800">
										{formatPrice(item.unitPrice * item.quantity)}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Cancellation pending banner -->
			{#if data.order.status === 'cancellation_requested'}
				<div class="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-center">
					<p class="text-sm font-medium text-orange-700">{m.account_cancel_pending()}</p>
				</div>
			{/if}

			<!-- Cancel button -->
			{#if canRequestCancellation}
				<div class="text-center">
					<button
						onclick={() => (showCancelModal = true)}
						class="rounded-lg border border-red-300 px-5 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
					>
						{m.account_cancel_request()}
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Cancel modal (same pattern as existing bestellung page) -->
{#if showCancelModal && data.order}
	<div
		class="fixed inset-0 z-[80] flex items-center justify-center"
		role="dialog"
		aria-modal="true"
	>
		<button
			class="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
			onclick={() => (showCancelModal = false)}
			aria-label="Schließen"
		></button>
		<div class="relative z-10 mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
			<!-- Warning icon -->
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-orange-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
			</div>
			<h3 class="mb-1 font-serif text-lg font-bold text-gray-900">
				{m.account_cancel_confirm_title()}
			</h3>
			<p class="mb-4 text-sm text-gray-600">{m.account_cancel_confirm_text()}</p>
			<div class="flex gap-2">
				<button
					onclick={() => (showCancelModal = false)}
					class="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
				>
					{m.account_cancel_abort()}
				</button>
				<form
					method="POST"
					action="?/requestCancellation"
					use:enhance={() => {
						return async ({ update }) => {
							await update();
							showCancelModal = false;
						};
					}}
					class="flex-1"
				>
					<input type="hidden" name="orderId" value={data.order.id} />
					<button
						type="submit"
						class="w-full rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
					>
						{m.account_cancel_confirm_button()}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
