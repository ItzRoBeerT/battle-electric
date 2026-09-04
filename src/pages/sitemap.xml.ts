import type { APIRoute } from 'astro';

// Routes are derived from the page files so new pages join the sitemap
// automatically. Keep this list for pages that must stay out (noindex).
const EXCLUDED = ['/contact-us/thank-you'];

const pages = import.meta.glob('./**/*.astro');

function toRoute(file: string): string {
	return (
		file
			.replace(/^\.\//, '/')
			.replace(/index\.astro$/, '')
			.replace(/\.astro$/, '')
			.replace(/\/$/, '') || '/'
	);
}

export const GET: APIRoute = ({ site }) => {
	const routes = Object.keys(pages)
		.map(toRoute)
		.filter((route) => !EXCLUDED.includes(route))
		.sort();

	const urls = routes
		.map((route) => `  <url><loc>${new URL(route, site).href}</loc></url>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
