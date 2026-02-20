<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { formatPrice } from '$lib/config';
	import CartButton from '$lib/components/CartButton.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';

	let isLangMenuOpen = $state(false);
	let isMobileMenuOpen = $state(false);
	let isScrolled = $state(false);
	let isCartOpen = $state(false);
	let shopEnabled = $state(true);

	let searchQuery = $state('');
	let searchResults = $state<
		{
			id: number;
			name: string;
			nameEn: string | null;
			price: number;
			modelSeries: string | null;
			qualityTier: string;
			image: string | null;
		}[]
	>([]);
	let isSearchOpen = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;
	let openDropdown = $state<string | null>(null);
	let dropdownTimeout: ReturnType<typeof setTimeout> | null = null;

	interface NavLink {
		href: string;
		label: () => string;
		shopOnly?: boolean;
	}

	interface NavCategory {
		id: string;
		label: () => string;
		links: NavLink[];
	}

	const navCategories: NavCategory[] = [
		{
			id: 'products',
			label: m.nav_cat_products,
			links: [
				{ href: '/verkauf', label: m.nav_products },
				{ href: '/premium', label: m.nav_premium }
			]
		},
		{
			id: 'service',
			label: m.nav_cat_service,
			links: [
				{ href: '/reparatur', label: m.nav_repair },
				{ href: '/ankauf', label: m.nav_buyback },
				{ href: '/erste-hilfe', label: m.nav_first_aid }
			]
		},
		{
			id: 'info',
			label: m.nav_cat_info,
			links: [{ href: '/bestellung', label: m.nav_order_status, shopOnly: true }]
		}
	];

	let filteredCategories = $derived(
		navCategories
			.map((cat) => ({
				...cat,
				links: cat.links.filter((link) => !link.shopOnly || shopEnabled)
			}))
			.filter((cat) => cat.links.length > 0)
	);

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		fetch('/api/store-status')
			.then((r) => r.json())
			.then((data) => {
				shopEnabled = data.shopEnabled;
			})
			.catch(() => {});
	});

	function getLangLabel(loc: string) {
		if (loc === 'de') return m.lang_de();
		if (loc === 'en') return m.lang_en();
		return loc.toUpperCase();
	}

	function handleSearch() {
		if (searchTimeout) clearTimeout(searchTimeout);
		if (searchQuery.trim().length < 2) {
			searchResults = [];
			isSearchOpen = false;
			return;
		}
		searchTimeout = setTimeout(async () => {
			try {
				const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
				const data = await res.json();
				searchResults = data.results;
				isSearchOpen = searchResults.length > 0 || searchQuery.trim().length >= 2;
			} catch {
				searchResults = [];
				isSearchOpen = false;
			}
		}, 250);
	}

	function closeSearch() {
		isSearchOpen = false;
		searchQuery = '';
		searchResults = [];
	}

	function navigateToResult(result: { id: number }) {
		const url = localizeHref(`/verkauf/${result.id}`);
		closeSearch();
		goto(url);
	}

	function getProductName(p: { name: string; nameEn: string | null }): string {
		return getLocale() === 'en' && p.nameEn ? p.nameEn : p.name;
	}

	function handleDropdownEnter(id: string) {
		if (dropdownTimeout) clearTimeout(dropdownTimeout);
		openDropdown = id;
	}

	function handleDropdownLeave() {
		dropdownTimeout = setTimeout(() => {
			openDropdown = null;
		}, 150);
	}

	function toggleDropdown(id: string) {
		openDropdown = openDropdown === id ? null : id;
	}

	function closeAll() {
		openDropdown = null;
		isLangMenuOpen = false;
		isMobileMenuOpen = false;
	}
</script>

<header
	class={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
		isScrolled ? 'bg-cream/95 py-2 shadow-md backdrop-blur-sm' : 'bg-cream/90 py-4 backdrop-blur-sm'
	}`}
>
	<div class="container mx-auto flex items-center justify-between gap-3 px-4">
		<a
			href={localizeHref('/')}
			class="shrink-0 font-display text-xl font-bold tracking-wide text-primary"
		>
			KAFFEETOM
		</a>

		<nav class="hidden items-center gap-1 lg:flex">
			{#each filteredCategories as cat}
				{#if cat.links.length === 1}
					<a
						href={localizeHref(cat.links[0].href)}
						class="rounded-lg px-3 py-2 font-body text-sm font-medium text-coffee transition-colors hover:bg-coffee/5 hover:text-primary"
					>
						{cat.links[0].label()}
					</a>
				{:else}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="relative"
						onmouseenter={() => handleDropdownEnter(cat.id)}
						onmouseleave={handleDropdownLeave}
					>
						<button
							onclick={() => toggleDropdown(cat.id)}
							class="flex items-center gap-1 rounded-lg px-3 py-2 font-body text-sm font-medium text-coffee transition-colors hover:bg-coffee/5 hover:text-primary"
							aria-expanded={openDropdown === cat.id}
							aria-haspopup="true"
						>
							{cat.label()}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class={`h-3.5 w-3.5 transition-transform ${openDropdown === cat.id ? 'rotate-180' : ''}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						{#if openDropdown === cat.id}
							<div
								class="absolute left-0 z-30 mt-1 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5"
							>
								{#each cat.links as link}
									<a
										href={localizeHref(link.href)}
										class="block px-4 py-2.5 font-body text-sm text-gray-700 transition-colors hover:bg-cream hover:text-primary"
										onclick={closeAll}
									>
										{link.label()}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<div class="relative">
				<div class="relative">
					<input
						type="text"
						placeholder={m.search_placeholder()}
						bind:value={searchQuery}
						oninput={handleSearch}
						onfocus={() => {
							if (searchResults.length > 0) isSearchOpen = true;
						}}
						class="w-44 rounded-lg border border-gray-200 bg-white/80 py-1.5 pr-8 pl-3 font-body text-sm text-coffee placeholder-gray-400 transition-all focus:w-56 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 focus:outline-none sm:w-52 sm:focus:w-64"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</div>

				{#if isSearchOpen}
					<div class="fixed inset-0 z-20" onclick={closeSearch} aria-hidden="true"></div>
					<div
						class="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/5 sm:w-80"
					>
						{#if searchResults.length > 0}
							{#each searchResults as result}
								<button
									type="button"
									class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-cream"
									onclick={() => navigateToResult(result)}
								>
									{#if result.image}
										<img
											src={result.image}
											alt={getProductName(result)}
											class="h-10 w-10 shrink-0 rounded-md object-cover"
										/>
									{:else}
										<div
											class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 text-gray-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="1.5"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
												/>
											</svg>
										</div>
									{/if}
									<div class="min-w-0 flex-1">
										<p class="truncate font-body text-sm font-medium text-coffee">
											{getProductName(result)}
										</p>
										<p class="font-body text-xs font-semibold text-primary">
											{formatPrice(result.price)}
										</p>
									</div>
									{#if result.modelSeries}
										<span
											class="shrink-0 rounded-full bg-coffee/10 px-2 py-0.5 font-body text-[10px] font-medium text-coffee"
										>
											{result.modelSeries}
										</span>
									{/if}
								</button>
							{/each}
						{:else}
							<div class="px-4 py-6 text-center font-body text-sm text-gray-500">
								{m.search_no_results()}
							</div>
						{/if}
					</div>
				{/if}
			</div>

			{#if shopEnabled}
				<CartButton onclick={() => (isCartOpen = true)} />
			{/if}

			<div class="relative">
				<button
					onclick={() => (isLangMenuOpen = !isLangMenuOpen)}
					class="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-coffee uppercase transition-colors hover:bg-coffee/5 hover:text-primary"
				>
					{getLocale()}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class={`h-3.5 w-3.5 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if isLangMenuOpen}
					<div
						class="fixed inset-0 z-20"
						onclick={() => (isLangMenuOpen = false)}
						aria-hidden="true"
					></div>
					<div
						class="absolute right-0 z-30 mt-1 w-32 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5"
					>
						{#each locales as loc}
							<a
								href={localizeHref(page.url.pathname, { locale: loc })}
								data-sveltekit-reload
								class={`block px-4 py-2 text-sm ${
									getLocale() === loc
										? 'bg-cream font-bold text-primary'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
								onclick={() => (isLangMenuOpen = false)}
							>
								{getLangLabel(loc)}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<button
				class="rounded-lg p-2 text-coffee transition-colors hover:bg-coffee/5 hover:text-primary lg:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-label="Menu"
			>
				{#if isMobileMenuOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<nav class="border-t border-gray-100 bg-cream px-4 pt-3 pb-4 lg:hidden">
			<div class="flex flex-col gap-1">
				{#each filteredCategories as cat}
					{#if cat.links.length === 1}
						<a
							href={localizeHref(cat.links[0].href)}
							class="rounded-lg px-3 py-2.5 font-body text-sm font-medium text-coffee transition-colors hover:bg-cream-dark hover:text-primary"
							onclick={closeAll}
						>
							{cat.links[0].label()}
						</a>
					{:else}
						<div class="mt-1">
							<button
								onclick={() => toggleDropdown(cat.id)}
								class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-body text-xs font-semibold tracking-wider text-primary uppercase"
								aria-expanded={openDropdown === cat.id}
							>
								{cat.label()}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class={`h-3.5 w-3.5 transition-transform ${openDropdown === cat.id ? 'rotate-180' : ''}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{#if openDropdown === cat.id}
								<div class="flex flex-col gap-0.5 pl-2">
									{#each cat.links as link}
										<a
											href={localizeHref(link.href)}
											class="rounded-lg px-3 py-2 font-body text-sm text-coffee transition-colors hover:bg-cream-dark hover:text-primary"
											onclick={closeAll}
										>
											{link.label()}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</nav>
	{/if}
</header>

{#if shopEnabled}
	<CartDrawer open={isCartOpen} onclose={() => (isCartOpen = false)} />
{/if}
