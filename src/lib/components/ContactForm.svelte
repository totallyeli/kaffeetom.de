<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let {
		type = 'contact',
		onsubmit
	}: {
		type?: 'contact' | 'buyback';
		onsubmit?: (data: FormData) => Promise<void>;
	} = $props();

	let loading = $state(false);
	let success = $state(false);
	let errorMsg = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		loading = true;
		errorMsg = '';

		try {
			if (onsubmit) {
				await onsubmit(formData);
			}
			success = true;
			form.reset();
		} catch (err) {
			errorMsg = err instanceof Error ? err.message : m.error();
		} finally {
			loading = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-4">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div>
			<label for="firstName" class="mb-1 block font-body text-sm font-medium text-gray-700">
				{m.form_firstname()} <span class="text-primary">*</span>
			</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				required
				class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
			/>
		</div>
		<div>
			<label for="lastName" class="mb-1 block font-body text-sm font-medium text-gray-700">
				{m.form_lastname()} <span class="text-primary">*</span>
			</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				required
				class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
			/>
		</div>
	</div>

	<div>
		<label for="email" class="mb-1 block font-body text-sm font-medium text-gray-700">
			{m.form_email()} <span class="text-primary">*</span>
		</label>
		<input
			type="email"
			id="email"
			name="email"
			required
			class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
		/>
	</div>

	<div>
		<label for="phone" class="mb-1 block font-body text-sm font-medium text-gray-700">
			{m.form_phone()}
			{#if type === 'buyback'}<span class="text-primary">*</span>{/if}
		</label>
		<input
			type="tel"
			id="phone"
			name="phone"
			required={type === 'buyback'}
			class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
		/>
	</div>

	{#if type === 'buyback'}
		<div>
			<label for="machineModel" class="mb-1 block font-body text-sm font-medium text-gray-700">
				{m.booking_machine()} <span class="text-primary">*</span>
			</label>
			<input
				type="text"
				id="machineModel"
				name="machineModel"
				required
				placeholder="z.B. Jura E8"
				class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
			/>
		</div>

		<div>
			<label for="images" class="mb-1 block font-body text-sm font-medium text-gray-700">
				{m.form_upload_images()}
			</label>
			<input
				type="file"
				id="images"
				name="images"
				multiple
				accept="image/jpeg,image/png,image/webp"
				class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-body file:text-sm file:font-medium file:text-primary"
			/>
		</div>
	{/if}

	<div>
		<label for="message" class="mb-1 block font-body text-sm font-medium text-gray-700">
			{m.form_message()} <span class="text-primary">*</span>
		</label>
		<textarea
			id="message"
			name="message"
			required
			rows="4"
			class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-body text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
		></textarea>
	</div>

	{#if errorMsg}
		<div class="rounded-lg bg-danger/10 px-4 py-3 font-body text-sm text-danger">
			{errorMsg}
		</div>
	{/if}

	{#if success}
		<div class="rounded-lg bg-success/10 px-4 py-3 font-body text-sm text-success">
			{m.booking_confirmed()}
		</div>
	{/if}

	<button
		type="submit"
		disabled={loading}
		class="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
	>
		{#if loading}
			{m.loading()}
		{:else}
			{m.form_submit()}
		{/if}
	</button>
</form>
