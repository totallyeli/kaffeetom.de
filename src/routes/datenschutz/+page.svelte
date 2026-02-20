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

	<h1 class="mb-8 font-display text-3xl font-bold text-coffee">{m.footer_datenschutz()}</h1>
	<div class="prose max-w-none font-body prose-gray">
		<h2>Datenschutzerklärung</h2>

		<h3>1. Verantwortlicher</h3>
		<p>
			{businessInfo.name}<br />{businessInfo.owner}<br />{locations[0].address}, {locations[0].zip}
			{locations[0].city}<br />E-Mail: {locations[0].email}
		</p>

		<h3>2. Erhebung und Speicherung personenbezogener Daten</h3>
		<p>
			Beim Besuch unserer Website werden automatisch Informationen durch den Browser übermittelt und
			in Server-Log-Dateien gespeichert. Dies umfasst: Browsertyp und -version, verwendetes
			Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage
			und IP-Adresse.
		</p>

		<h3>3. Cookies</h3>
		<p>
			Unsere Website verwendet Cookies. Es handelt sich dabei um kleine Textdateien, die auf Ihrem
			Endgerät gespeichert werden. Wir verwenden ein Cookie für die Speicherung Ihrer
			Cookie-Einstellungen (notwendig) sowie optionale Analyse-Cookies zur Verbesserung unserer
			Website.
		</p>

		<h3>4. Kontaktformular & Bestellungen</h3>
		<p>
			Wenn Sie uns per Kontaktformular, Ankaufformular oder Bestellung kontaktieren, werden Ihre
			Angaben zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
			Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
		</p>

		<h3>5. Zahlungsabwicklung</h3>
		<p>
			Für die Zahlungsabwicklung nutzen wir den Dienst Stripe. Ihre Zahlungsdaten werden direkt an
			Stripe übermittelt. Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe: <a
				href="https://stripe.com/de/privacy"
				target="_blank"
				rel="noopener noreferrer">stripe.com/de/privacy</a
			>
		</p>

		<h3>6. Ihre Rechte</h3>
		<p>
			Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
			Datenübertragbarkeit und Widerspruch. Bitte wenden Sie sich dazu an: {locations[0].email}
		</p>
	</div>
</div>
