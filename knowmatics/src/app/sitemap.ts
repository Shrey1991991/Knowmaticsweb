import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { CATEGORIES } from "@/lib/categories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.knowmatics.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getAllContent();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/press-releases`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/thought-leadership`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/submit-press-release`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const contentRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/${item.type === "press-release" ? "press-releases" : "thought-leadership"}/${item.slug}`,
    lastModified: item.publishedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...contentRoutes];
}
