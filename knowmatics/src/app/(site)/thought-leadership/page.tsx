import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";
import { ContentCard } from "@/components/ContentCard";
import { getContentByType } from "@/lib/content";
import { isCategorySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Thought Leadership",
  description:
    "Analysis, opinion, and interviews on CNC machining, cutting tools, automation, and the future of manufacturing in India.",
};

export default async function ThoughtLeadershipPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await getContentByType("article");
  const items =
    category && isCategorySlug(category) ? all.filter((i) => i.category === category) : all;

  return (
    <>
      <ListingHeader
        eyebrow="Analysis & Opinion"
        title="Thought Leadership"
        description="Perspective and analysis for people building Indian manufacturing — not just headlines."
      />
      <Container className="py-12">
        <div className="mb-8">
          <CategoryFilterBar basePath="/thought-leadership" activeCategory={category} />
        </div>
        {items.length === 0 ? (
          <p className="py-16 text-center text-[var(--color-steel-500)]">
            No articles in this category yet.
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
