import type { APIRoute } from 'astro';
import { href, SITE } from '../i18n';

/**
 * robots.txt at build time: the preview deployment (SITE_NOINDEX=true) locks every crawler out,
 * the production build at hissi.app allows all and names the sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const blocked = import.meta.env.SITE_NOINDEX === 'true';
  const body = blocked
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(href('/sitemap-index.xml'), site ?? SITE).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
