<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { businessInfo, locations } from '$lib/config';
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

	<h1 class="mb-8 font-display text-3xl font-bold text-coffee">{m.contact_impressum_title()}</h1>
	<div class="prose max-w-none font-body prose-gray">
		<h2>Angaben gemäß § 5 TMG</h2>
		<p>
			<strong>{businessInfo.name}</strong><br />
			Inhaberin: {businessInfo.owner}<br />
			{locations[0].address}<br />
			{locations[0].zip}
			{locations[0].city}
		</p>

		<h3>Kontakt</h3>
		<p>
			Telefon: {locations[0].phone}<br />
			E-Mail: {locations[0].email}
		</p>

		<h3>Umsatzsteuer-Identifikationsnummer</h3>
		<p>
			USt-ID: {businessInfo.ustIdNr}<br />
			Steuernummer: {businessInfo.taxNumber}
		</p>

		<h3>Berufsbezeichnung und berufsrechtliche Regelungen</h3>
		<p>{businessInfo.taxInfo}</p>

		<h3>Streitschlichtung</h3>
		<p>
			Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
				href="https://ec.europa.eu/consumers/odr/"
				target="_blank"
				rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a
			>
		</p>
		<p>
			Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
			Verbraucherschlichtungsstelle teilzunehmen.
		</p>
	</div>
</div>
