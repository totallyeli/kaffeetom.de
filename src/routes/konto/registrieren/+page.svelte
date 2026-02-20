<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<section class="bg-cream py-24 md:py-28">
	<div class="container mx-auto max-w-md px-4">
		<h1 class="mb-8 text-center font-serif text-3xl font-bold text-primary md:text-4xl">
			{m.account_register_title()}
		</h1>

		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
			<form method="post" action="?/signUpEmail" use:enhance>
				<div class="mb-4">
					<label for="name" class="mb-2 block text-sm font-semibold text-gray-700">
						{m.account_register_name()}
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-primary focus:ring-0"
					/>
				</div>

				<div class="mb-4">
					<label for="email" class="mb-2 block text-sm font-semibold text-gray-700">
						{m.account_register_email()}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-primary focus:ring-0"
					/>
				</div>

				<div class="mb-4">
					<label for="password" class="mb-2 block text-sm font-semibold text-gray-700">
						{m.account_register_password()}
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						minlength="8"
						class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-primary focus:ring-0"
					/>
				</div>

				{#if form?.message}
					<div class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
						{form.message}
					</div>
				{/if}

				<button
					type="submit"
					class="mb-5 w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 focus:outline-none"
				>
					{m.account_register_submit()}
				</button>
			</form>

			<p class="mt-6 text-center text-sm text-gray-500">
				{m.account_register_has_account()}
				<a
					href={localizeHref('/konto/login')}
					class="font-semibold text-primary hover:text-primary/80"
				>
					{m.account_register_login_link()}
				</a>
			</p>
		</div>
	</div>
</section>
