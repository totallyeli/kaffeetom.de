<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { businessInfo } from '$lib/config';
</script>

<div class="mx-auto max-w-4xl px-4 py-12 md:py-16">
	<a
		href={localizeHref('/')}
		class="mb-6 inline-flex items-center gap-1 font-body text-sm text-primary transition-colors hover:text-primary-dark"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
			/></svg
		>
		{m.back()}
	</a>

	<h1 class="mb-8 font-display text-3xl font-bold text-coffee">{m.contact_agb_title()}</h1>
	<div class="prose max-w-none font-body prose-gray">
		<h2>Allgemeine Geschäftsbedingungen</h2>
		<p><strong>{businessInfo.name}</strong><br />Inhaberin: {businessInfo.owner}</p>
		<p>{businessInfo.taxInfo}</p>
		<p>Steuernummer: {businessInfo.taxNumber}<br />USt-ID: {businessInfo.ustIdNr}</p>

		<h3>Gewährleistung</h3>
		<p>
			Auf unsere gebrauchten Jura Kaffeevollautomaten erhalten Sie {businessInfo.warrantyMonths} Monate
			Gewährleistung. Die Gewährleistung erstreckt sich auf die Funktionstüchtigkeit des Gerätes.
		</p>

		<h3>Preise</h3>
		<p>
			Alle Preise verstehen sich als Endpreise. Aufgrund der Differenzbesteuerung nach §25a UStG
			wird die Umsatzsteuer nicht ausgewiesen.
		</p>

		<h3>Rückgabe</h3>
		<p>
			Ein Umtausch oder eine Rückgabe ist bei Abholung im Geschäft innerhalb von 14 Tagen möglich,
			sofern das Gerät in einwandfreiem Zustand zurückgegeben wird.
		</p>

		<h3>Reparaturen</h3>
		<p>
			Reparaturen werden nur an Jura Geräten durchgeführt. Ein Versand ist nicht möglich — die
			Geräte müssen persönlich gebracht werden.
		</p>
	</div>
</div>
