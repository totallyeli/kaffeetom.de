<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Hero from '$lib/components/Hero.svelte';
	import { businessInfo } from '$lib/config';
</script>

<Hero title={m.first_aid_title()} subtitle={m.first_aid_subtitle()} />

<section class="mx-auto max-w-4xl px-4 py-12 md:py-16">
	<div class="mb-10 text-center">
		<p class="font-body text-gray-600">{m.first_aid_youtube()}</p>
	</div>

	<div class="overflow-hidden rounded-xl shadow-lg">
		<div class="aspect-video">
			<iframe
				src="https://www.youtube.com/embed/videoseries?list=UUX6Q9WyBhJ5aNIxRcNCPLvQ"
				title="KAFFEETOM YouTube"
				class="h-full w-full"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>

	<div class="mt-8 text-center">
		<a
			href={businessInfo.youtubeUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-lg bg-danger px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-danger/90"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
				/>
			</svg>
			YouTube
		</a>
	</div>
</section>
