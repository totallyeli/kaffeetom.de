import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const site = 'https://kaffeetom.de';
	const lastmod = new Date().toISOString().split('T')[0];

	const pages = [
		{ path: '', priority: '1.0', changefreq: 'weekly' },
		{ path: '/verkauf', priority: '0.9', changefreq: 'weekly' },
		{ path: '/premium', priority: '0.9', changefreq: 'weekly' },
		{ path: '/reparatur', priority: '0.8', changefreq: 'monthly' },
		{ path: '/ankauf', priority: '0.7', changefreq: 'monthly' },
		{ path: '/erste-hilfe', priority: '0.6', changefreq: 'monthly' },
		{ path: '/agb', priority: '0.3', changefreq: 'yearly' },
		{ path: '/impressum', priority: '0.3', changefreq: 'yearly' },
		{ path: '/datenschutz', priority: '0.3', changefreq: 'yearly' },
		{ path: '/bestellung', priority: '0.4', changefreq: 'monthly' }
	];

	const urls = pages.flatMap((p) => [
		{ loc: `${site}${p.path}`, hreflang: 'de', priority: p.priority, changefreq: p.changefreq },
		{
			loc: `${site}/en${p.path}`,
			hreflang: 'en',
			priority: String(Math.max(0.1, Number(p.priority) - 0.1)),
			changefreq: p.changefreq
		}
	]);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${site}${u.loc.replace(site, '').replace('/en', '')}" />
    <xhtml:link rel="alternate" hreflang="en" href="${site}/en${u.loc.replace(site, '').replace('/en', '')}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${u.loc.replace(site, '').replace('/en', '')}" />
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=86400'
		}
	});
};
