<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const euroPrice = $derived((data.product.price / 100).toFixed(2));
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-4xl space-y-6">
		<div>
			<h2 class="font-serif text-3xl text-primary">Produkt bearbeiten</h2>
			<p class="mt-1 text-sm text-gray-500">
				Produkt #{data.product.id} aktualisieren und mit Stripe syncen.
			</p>
		</div>

		{#if form?.error}
			<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance
			class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
		>
			<div class="grid gap-4 md:grid-cols-2">
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Name</span>
					<input
						type="text"
						name="name"
						value={data.product.name}
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Name (EN)</span>
					<input
						type="text"
						name="nameEn"
						value={data.product.nameEn ?? ''}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Beschreibung</span>
					<textarea
						name="description"
						rows="4"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
						>{data.product.description ?? ''}</textarea
					>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Beschreibung (EN)</span>
					<textarea
						name="descriptionEn"
						rows="4"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
						>{data.product.descriptionEn ?? ''}</textarea
					>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Preis in EUR</span>
					<input
						type="text"
						name="price"
						value={euroPrice}
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Status</span>
					<select
						name="status"
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					>
						{#each data.productStatuses as status}
							<option value={status} selected={status === data.product.status}>{status}</option>
						{/each}
					</select>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Qualitatsstufe</span>
					<select
						name="qualityTier"
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					>
						{#each data.qualityTiers as tier}
							<option value={tier} selected={tier === data.product.qualityTier}>{tier}</option>
						{/each}
					</select>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Zustand</span>
					<input
						type="text"
						name="condition"
						value={data.product.condition ?? ''}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Modellserie</span>
					<input
						type="text"
						name="modelSeries"
						value={data.product.modelSeries ?? ''}
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Garantie (Monate)</span>
					<input
						type="number"
						name="warrantyMonths"
						value={data.product.warrantyMonths}
						min="0"
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Kategorie</span>
					<select
						name="categoryId"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					>
						<option value="">Keine Kategorie</option>
						{#each data.categories as category}
							<option value={category.id} selected={category.id === data.product.categoryId}>
								{category.name}
							</option>
						{/each}
					</select>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Produktbild</span>
					{#if data.image}
						<div class="mb-2">
							<img
								src={data.image.url}
								alt={data.product.name}
								class="h-36 rounded-lg border border-gray-200 object-cover"
							/>
						</div>
					{/if}
					<input
						type="file"
						name="image"
						accept="image/png,image/jpeg,image/webp"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
					/>
				</label>
			</div>

			<div class="mt-6 flex items-center gap-3">
				<button
					type="submit"
					class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
				>
					Speichern
				</button>
				<a
					href="/admin/products"
					class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
				>
					Zuruck
				</a>
			</div>
		</form>
	</div>
</section>
