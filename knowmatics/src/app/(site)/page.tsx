import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContentCard } from "@/components/ContentCard";
import { HeadlineTicker } from "@/components/HeadlineTicker";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ValueProps } from "@/components/ValueProps";
import { Newsletter } from "@/components/Newsletter";
import {
  getAllContent,
  getContentByType,
  getFeaturedContent,
} from "@/lib/content";

export default async function HomePage() {
  const [all, featured, pressReleases, articles] = await Promise.all([
    getAllContent(),
    getFeaturedContent(6),
    getContentByType("press-release"),
    getContentByType("article"),
  ]);

  const ticker = all.slice(0, 8);
  const featuredMain = featured[0] ?? all[0];
  const featuredSide = (featured[1] ? featured.slice(1) : all.slice(1)).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-navy-950)] text-white">
        <div className="industrial-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-[var(--color-spark-500)]/20 blur-3xl" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-spark-400)]">
              India&apos;s Metal Cutting Industry — News &amp; Insight
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Where India&apos;s metal cutting industry gets read.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
              Press releases and thought leadership on CNC machining, cutting
              tools, automation, and additive manufacturing — written for the
              engineers, plant managers, and business leaders actually running
              the shop floor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/press-releases"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-spark-500)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-spark-600)]"
              >
                Latest Press Releases
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit-press-release"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Submit a Press Release
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <HeadlineTicker items={ticker} />

      {/* Featured */}
      {featuredMain && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Editor's Picks" title="Featured this week" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ContentCard item={featuredMain} size="large" />
              </div>
              <div className="flex flex-col gap-6">
                {featuredSide.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Latest press releases */}
      <section className="bg-[var(--color-paper-dim)] py-16">
        <Container>
          <SectionHeading
            eyebrow="Company Announcements"
            title="Latest Press Releases"
            href="/press-releases"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pressReleases.slice(0, 3).map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Latest thought leadership */}
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Analysis & Opinion"
            title="Latest Thought Leadership"
            href="/thought-leadership"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="bg-[var(--color-paper-dim)] py-16">
        <Container>
          <SectionHeading eyebrow="Browse" title="Coverage areas" />
          <CategoryGrid />
        </Container>
      </section>

      {/* Value props for PR / marketing audience */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Why Knowmatics" title="Built for this industry, not the internet at large" />
          <ValueProps />
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[var(--color-navy-950)] py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              The week in metal cutting, in one email.
            </h2>
            <p className="mt-2 max-w-lg text-steel-300">
              Press releases, analysis, and events — curated for people who
              actually work in Indian manufacturing.
            </p>
          </div>
          <Newsletter />
        </Container>
      </section>
    </>
  );
}
