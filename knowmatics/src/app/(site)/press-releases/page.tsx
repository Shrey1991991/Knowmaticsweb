import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";
import { ContentCard } from "@/components/ContentCard";
import { getContentByType } from "@/lib/content";
import { isCategorySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "Company announcements, launches, and news from India's metal cutting industry — CNC machining, tooling, automation, and additive manufacturing.",
};

export default async function PressReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await getContentByType("press-release");
  const items =
    category && isCategorySlug(category) ? all.filter((i) => i.category === category) : all;

  return (
    <>
      <ListingHeader
        eyebrow="Company Announcements"
        title="Press Releases"
        description="Launches, partnerships, expansions, and appointments from across India's metal cutting industry."
      />
      <Container className="py-12">
        <div className="mb-8">
          <CategoryFilterBar basePath="/press-releases" activeCategory={category} />
        </div>
        {items.length === 0 ? (
          <p className="py-16 text-center text-[var(--color-steel-500)]">
            No press releases in this category yet.
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
