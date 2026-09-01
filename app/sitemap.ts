import type { MetadataRoute } from 'next';
import { navGroups, standaloneLinks, footerLinks } from '@/lib/nav';
import { absoluteUrl } from '@/lib/site';
import { providers } from '@/lib/directory/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = Array.from(
    new Set([
      '/',
      ...navGroups.flatMap((g) => g.links.map((l) => l.href)),
      ...standaloneLinks.map((l) => l.href),
      ...footerLinks.map((l) => l.href),
      // Real listings only. Example records are noindex and stay out.
      ...providers.filter((p) => !p.isExample).map((p) => `/providers/${p.slug}`),
    ]),
  );

  const lastModified = new Date();

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
