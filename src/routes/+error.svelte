<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<section class="flex min-h-[60vh] items-center justify-center bg-cream px-4">
	<div class="max-w-md text-center">
		<p class="font-display text-8xl font-bold text-primary">{page.status}</p>
		<h1 class="mt-4 font-display text-2xl font-bold text-coffee">
			{#if page.status === 404}
				{m.error_not_found_title()}
			{:else}
				{m.error_server_title()}
			{/if}
		</h1>
		<p class="mt-2 font-body text-gray-600">
			{#if page.status === 404}
				{m.error_not_found_text()}
			{:else if page.error?.message}
				{page.error.message}
			{:else}
				{m.error_server_text()}
			{/if}
		</p>
		<a
			href={localizeHref('/')}
			class="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
		>
			{m.error_back_home()}
		</a>
	</div>
</section>
