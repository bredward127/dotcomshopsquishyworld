import type { MetadataRoute } from 'next';
import { navGroups, footerLinks } from '@/lib/nav';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = Array.from(
    new Set(['/', ...navGroups.flatMap((g) => g.links.map((l) => l.href)), ...footerLinks.map((l) => l.href)]),
  );

  const lastModified = new Date();

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
