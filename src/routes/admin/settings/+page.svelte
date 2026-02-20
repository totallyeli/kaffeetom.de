<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPrice } from '$lib/config';

	let { data, form } = $props();
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-5xl space-y-6">
		<div>
			<h2 class="font-serif text-3xl text-primary">Einstellungen</h2>
			<p class="mt-1 text-sm text-gray-500">
				Shopbetrieb, Versand und Stripe-Konfiguration verwalten.
			</p>
		</div>

		{#if form?.error}
			<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<div class="grid gap-6 lg:grid-cols-2">
			<form
				method="POST"
				action="?/setMode"
				use:enhance
				class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
			>
				<h3 class="font-serif text-xl text-primary">Store-Modus</h3>
				<div class="mt-4 space-y-3">
					<label class="flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							name="mode"
							value="auto"
							checked={data.settings.mode === 'auto'}
							class="border-gray-300 text-primary focus:ring-primary"
						/>
						Automatisch
					</label>
					<label class="flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							name="mode"
							value="manual"
							checked={data.settings.mode === 'manual'}
							class="border-gray-300 text-primary focus:ring-primary"
						/>
						Manuell
					</label>
					<label class="flex items-center gap-2 text-sm text-gray-700">
						<input
							type="checkbox"
							name="open"
							value="1"
							checked={data.settings.isOpen}
							class="rounded border-gray-300 text-primary focus:ring-primary"
						/>
						Store geoffnet
					</label>
					<label class="block space-y-1 text-sm">
						<span class="text-gray-600">Hinweistext bei Schliessung</span>
						<input
							type="text"
							name="closedMessage"
							value={data.settings.closedMessage ?? ''}
							class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
						/>
					</label>
				</div>
				<button
					type="submit"
					class="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
				>
					Modus speichern
				</button>
			</form>

			<form
				method="POST"
				action="?/setShopEnabled"
				use:enhance
				class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
			>
				<h3 class="font-serif text-xl text-primary">Shop aktivieren</h3>
				<div class="mt-4 space-y-2">
					<label class="flex items-center gap-2 text-sm text-gray-700">
						<input
							type="checkbox"
							name="shopEnabled"
							value="1"
							checked={data.settings.shopEnabledByAdmin}
							class="rounded border-gray-300 text-primary focus:ring-primary"
						/>
						Shop verfugbar
					</label>
					<p class="text-sm text-gray-600">
						Stripe Status:
						<span class={data.settings.stripeConfigured ? 'text-emerald-700' : 'text-red-700'}>
							{data.settings.stripeConfigured ? 'Konfiguriert' : 'Nicht konfiguriert'}
						</span>
					</p>
					{#if !data.settings.stripeConfigured && data.settings.stripeMissingKeys.length > 0}
						<p class="text-xs text-red-700">
							Fehlende Keys: {data.settings.stripeMissingKeys.join(', ')}
						</p>
					{/if}
				</div>
				<button
					type="submit"
					class="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
				>
					Shop-Status speichern
				</button>
			</form>
		</div>

		<form
			method="POST"
			action="?/setShipping"
			use:enhance
			class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
		>
			<h3 class="font-serif text-xl text-primary">Versandkonfiguration</h3>
			<div class="mt-4 grid gap-4 md:grid-cols-2">
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Versandpauschale (EUR)</span>
					<input
						type="text"
						name="shippingFlatRate"
						value={(data.settings.shippingFlatRate / 100).toFixed(2)}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
					<p class="text-xs text-gray-500">
						Aktuell: {formatPrice(data.settings.shippingFlatRate)}
					</p>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Versandfrei ab (EUR)</span>
					<input
						type="text"
						name="shippingFreeThreshold"
						value={(data.settings.shippingFreeThreshold / 100).toFixed(2)}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
					<p class="text-xs text-gray-500">
						Aktuell: {formatPrice(data.settings.shippingFreeThreshold)}
					</p>
				</label>
			</div>
			<button
				type="submit"
				class="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
			>
				Versand speichern
			</button>
		</form>
	</div>
</section>
