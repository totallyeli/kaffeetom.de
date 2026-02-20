<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let { children, data } = $props();

	$effect(() => {
		if (!browser) return;

		function handleAnchorClick(e: MouseEvent) {
			const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
			if (!anchor) return;

			const id = anchor.getAttribute('href')?.slice(1);
			if (!id) return;

			const target = document.getElementById(id);
			if (!target) return;

			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', `#${id}`);
		}

		document.addEventListener('click', handleAnchorClick);
		return () => document.removeEventListener('click', handleAnchorClick);
	});

	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
	const isLegalPage = $derived(
		page.url.pathname.startsWith('/impressum') ||
			page.url.pathname.startsWith('/datenschutz') ||
			page.url.pathname.startsWith('/agb')
	);
	const hideMainNav = $derived(isAdmin || isLegalPage);

	const SITE_URL = 'https://kaffeetom.de';

	const locale = $derived(getLocale());

	const ogLocaleMap: Record<string, string> = {
		de: 'de_DE',
		en: 'en_US'
	};
	const ogLocale = $derived(ogLocaleMap[locale] ?? 'de_DE');
	const ogAlternateLocales = $derived(Object.values(ogLocaleMap).filter((l) => l !== ogLocale));

	const canonicalUrl = $derived(locale === 'de' ? SITE_URL : `${SITE_URL}/${locale}`);

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Store',
		name: 'KAFFEETOM',
		url: SITE_URL,
		telephone: '+4972637099822',
		description: 'An und Verkauf von Jura Kaffeevollautomaten',
		foundingDate: '2006',
		founder: { '@type': 'Person', name: 'Sabine Rossel' },
		address: [
			{
				'@type': 'PostalAddress',
				streetAddress: 'Epfenbacherstr. 5',
				addressLocality: 'Helmstadt',
				postalCode: '74921',
				addressCountry: 'DE'
			},
			{
				'@type': 'PostalAddress',
				streetAddress: 'Neckarauerstr. 9',
				addressLocality: 'Mannheim',
				postalCode: '68199',
				addressCountry: 'DE'
			}
		],
		sameAs: [
			'https://www.facebook.com/www.kaffeetom.de',
			'https://www.youtube.com/channel/UCX6Q9WyBhJ5aNIxRcNCPLvQ'
		]
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/uploads/logo/kaffeetom-logo.webp" />
	<link rel="canonical" href={canonicalUrl} />

	<link rel="alternate" hreflang="de" href={SITE_URL} />
	<link rel="alternate" hreflang="en" href={`${SITE_URL}/en`} />
	<link rel="alternate" hreflang="x-default" href={SITE_URL} />

	<title>{m.seo_title()}</title>
	<meta name="description" content={m.seo_description()} />
	<meta
		name="keywords"
		content="Jura Kaffeevollautomat, gebraucht, Verkauf, Reparatur, Wartung, Helmstadt, Mannheim, Kaffeetom"
	/>
	<meta name="author" content="KAFFEETOM" />
	<meta name="theme-color" content="#8b1a1a" />
	<meta name="color-scheme" content="light" />

	<meta property="og:title" content={m.seo_og_title()} />
	<meta property="og:description" content={m.seo_og_description()} />
	<meta property="og:image" content={`${SITE_URL}/uploads/logo/kaffeetom-logo.webp`} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={ogLocale} />
	{#each ogAlternateLocales as altLocale}
		<meta property="og:locale:alternate" content={altLocale} />
	{/each}
	<meta property="og:site_name" content="KAFFEETOM" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.seo_og_title()} />
	<meta name="twitter:description" content={m.seo_twitter_description()} />
	<meta name="twitter:image" content={`${SITE_URL}/uploads/logo/kaffeetom-logo.webp`} />

	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
>
	{m.skip_to_content()}
</a>

{#if !hideMainNav}
	<Header user={data.user} />
{/if}
<main id="main" class={hideMainNav ? '' : 'pt-16'}>
	{@render children()}
</main>
{#if !isAdmin}
	<Footer />
	<CookieBanner />
{/if}
