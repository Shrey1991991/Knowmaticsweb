import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { ContentCard } from "@/components/ContentCard";
import { getContentByCategory } from "@/lib/content";
import { CATEGORIES, categoryLabel, isCategorySlug } from "@/lib/categories";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategorySlug(slug)) return {};
  const label = categoryLabel(slug);
  return {
    title: label,
    description: `Press releases and thought leadership on ${label.toLowerCase()} for India's metal cutting industry.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const category = CATEGORIES.find((c) => c.slug === slug)!;
  const items = await getContentByCategory(slug);

  return (
    <>
      <ListingHeader eyebrow="Category" title={category.label} description={category.description} />
      <Container className="py-12">
        {items.length === 0 ? (
          <p className="py-16 text-center text-[var(--color-steel-500)]">
            Nothing published in this category yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
