import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/PostDetail";
import { getContentByType, getContentBySlug, getRelatedContent } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getContentByType("article");
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.seoDescription || item.excerpt,
    openGraph: {
      title: item.title,
      description: item.seoDescription || item.excerpt,
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item || item.type !== "article") notFound();

  const related = await getRelatedContent(item, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.publishedAt,
    author: { "@type": "Person", name: item.author.name },
    publisher: { "@type": "Organization", name: "Knowmatics by Shrey" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetail item={item} related={related} />
    </>
  );
}
