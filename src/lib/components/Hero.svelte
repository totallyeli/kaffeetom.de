<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';

	let {
		title,
		subtitle,
		cta,
		backgroundImage
	}: {
		title: string;
		subtitle?: string;
		cta?: { label: string; href: string };
		backgroundImage?: string;
	} = $props();
</script>

<section
	class="relative flex min-h-[40vh] items-center justify-center overflow-hidden md:min-h-[60vh]"
>
	{#if backgroundImage}
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url('{backgroundImage}')"
		></div>
		<div class="absolute inset-0 bg-gradient-to-b from-coffee/80 via-coffee/60 to-coffee/80"></div>
	{:else}
		<div class="absolute inset-0 bg-gradient-to-b from-coffee-dark via-coffee to-coffee-dark"></div>
	{/if}

	<div class="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
		<h1 class="font-display text-3xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
			{title}
		</h1>
		{#if subtitle}
			<p class="mx-auto mt-4 max-w-2xl font-body text-lg text-white/80 md:text-xl">
				{subtitle}
			</p>
		{/if}
		{#if cta}
			<a
				href={localizeHref(cta.href)}
				class="mt-8 inline-flex items-center rounded-lg bg-primary px-8 py-3 font-body text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-primary-dark hover:shadow-xl"
			>
				{cta.label}
			</a>
		{/if}
	</div>
</section>
