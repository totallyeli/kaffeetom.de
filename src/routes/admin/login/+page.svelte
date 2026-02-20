<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');
	let isSubmitting = $state(false);

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		if (isSubmitting) return;

		errorMsg = '';
		isSubmitting = true;

		try {
			const result = await authClient.signIn.email({
				email,
				password
			});

			if (result.error) {
				errorMsg = 'Ungültige Anmeldedaten';
				return;
			}

			goto('/admin');
		} catch {
			errorMsg = 'Anmeldung fehlgeschlagen';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center font-serif text-2xl font-bold text-primary">KAFFEETOM Admin</h1>

		<form onsubmit={handleLogin} class="space-y-4">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-gray-700">E-Mail</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					autocomplete="email"
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-0"
				/>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Passwort</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-0"
				/>
			</div>

			{#if errorMsg}
				<p class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>
			{/if}

			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
			>
				{isSubmitting ? 'Anmelden...' : 'Anmelden'}
			</button>
		</form>
	</div>
</div>
