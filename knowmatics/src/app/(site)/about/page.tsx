import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { ValueProps } from "@/components/ValueProps";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "About",
  description:
    "Knowmatics by Shrey is a dedicated media platform for press releases and thought leadership in India's metal cutting industry.",
};

const STATS = [
  { label: "Coverage areas", value: `${CATEGORIES.length}` },
  { label: "Focus", value: "Metal Cutting" },
  { label: "Audience", value: "India" },
];

export default function AboutPage() {
  return (
    <>
      <ListingHeader
        eyebrow="About Knowmatics"
        title="A media platform built for one industry"
        description="Not a general manufacturing blog — a dedicated home for press releases and thought leadership in India's metal cutting industry."
      />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-3xl space-y-6 text-[var(--color-navy-800)]">
            <p className="text-lg leading-relaxed">
              Knowmatics by Shrey exists because India&apos;s metal cutting
              industry — CNC machining, cutting tools, automation, and
              additive manufacturing — didn&apos;t have a publication written
              specifically for it. General manufacturing and technology
              outlets cover this space occasionally; Knowmatics covers it as
              its entire beat.
            </p>
            <p className="leading-relaxed">
              We publish two kinds of content. <strong>Press releases</strong> —
              launches, partnerships, appointments, and company news, sourced
              directly from the companies making the news. And{" "}
              <strong>thought leadership</strong> — analysis, opinion, and
              interviews written for the engineers, plant managers, and
              business leaders who actually run the shop floor, not a general
              tech audience.
            </p>
            <p className="leading-relaxed">
              The goal is simple: when something happens in Indian metal
              cutting — a new machine, a new tooling range, a shift in export
              demand, a shop floor automation story worth telling — Knowmatics
              should be where it gets covered properly.
            </p>

            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-steel-500)]">
                Founder
              </p>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy-950)] text-sm font-bold text-white">
                  S
                </span>
                <div>
                  <p className="font-semibold text-[var(--color-navy-950)]">Shrey</p>
                  <p className="text-sm text-[var(--color-steel-500)]">Founder & Editor, Knowmatics</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-[var(--color-navy-950)] p-6 text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-spark-400)]">
                At a glance
              </p>
              <dl className="space-y-4">
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-sm text-steel-300">{s.label}</dt>
                    <dd className="font-display font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="mb-2 font-semibold text-[var(--color-navy-950)]">Have news to share?</p>
              <p className="mb-4 text-sm text-[var(--color-navy-700)]/85">
                We publish company announcements from across the industry.
              </p>
              <Link
                href="/submit-press-release"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-spark-500)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-spark-600)]"
              >
                Submit a Press Release
              </Link>
            </div>
          </aside>
        </div>
      </Container>

      <div className="bg-[var(--color-paper-dim)] py-16">
        <Container>
          <ValueProps />
        </Container>
      </div>
    </>
  );
}
