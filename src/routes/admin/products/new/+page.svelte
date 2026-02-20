<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<section class="bg-gray-50 px-4 py-8 sm:px-6">
	<div class="mx-auto max-w-4xl space-y-6">
		<div>
			<h2 class="font-serif text-3xl text-primary">Neues Produkt</h2>
			<p class="mt-1 text-sm text-gray-500">Produktdaten erfassen und veroffentlichen.</p>
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
						required
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Name (EN)</span>
					<input
						type="text"
						name="nameEn"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Beschreibung</span>
					<textarea
						name="description"
						rows="4"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					></textarea>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Beschreibung (EN)</span>
					<textarea
						name="descriptionEn"
						rows="4"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					></textarea>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Preis in EUR</span>
					<input
						type="text"
						name="price"
						required
						placeholder="1499.00"
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
							<option value={status}>{status}</option>
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
							<option value={tier}>{tier}</option>
						{/each}
					</select>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Zustand</span>
					<input
						type="text"
						name="condition"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Modellserie</span>
					<input
						type="text"
						name="modelSeries"
						class="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-primary focus:ring-0"
					/>
				</label>
				<label class="space-y-1 text-sm">
					<span class="text-gray-600">Garantie (Monate)</span>
					<input
						type="number"
						name="warrantyMonths"
						value="12"
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
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</label>
				<label class="space-y-1 text-sm md:col-span-2">
					<span class="text-gray-600">Produktbild</span>
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
					Produkt erstellen
				</button>
				<a
					href="/admin/products"
					class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
				>
					Abbrechen
				</a>
			</div>
		</form>
	</div>
</section>
