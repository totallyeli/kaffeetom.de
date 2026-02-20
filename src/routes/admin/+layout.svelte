<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const pathname = $derived(String(page.url.pathname));
	const isLoginPage = $derived(pathname === '/admin/login');

	const tabs = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/orders', label: 'Bestellungen' },
		{ href: '/admin/products', label: 'Produkte' },
		{ href: '/admin/bookings', label: 'Termine' },
		{ href: '/admin/contacts', label: 'Anfragen' },
		{ href: '/admin/analytics', label: 'Analytics' },
		{ href: '/admin/settings', label: 'Einstellungen' }
	];
</script>

<svelte:head>
	<title>Admin - KAFFEETOM</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	{#if !isLoginPage}
		<nav class="border-b border-gray-200 bg-white shadow-sm">
			<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
				<h1 class="font-serif text-xl text-primary">
					KAFFEETOM <span class="text-sm font-normal text-gray-400">Admin</span>
				</h1>
				<div class="flex items-center gap-3">
					<a
						href="/"
						class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-primary hover:text-primary"
					>
						Zur Website
					</a>
				</div>
			</div>
		</nav>
		<div class="border-b border-gray-200 bg-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6">
				<div class="flex gap-4 overflow-x-auto">
					{#each tabs as tab}
						<a
							href={tab.href}
							class="border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors {(
								tab.href === '/admin' ? pathname === '/admin' : pathname.startsWith(tab.href)
							)
								? 'border-primary text-primary'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
						>
							{tab.label}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{@render children()}
</div>
