import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Submit a Press Release",
  description:
    "Submit your company's press release to Knowmatics — reach engineers, plant managers, and decision-makers in India's metal cutting industry.",
};

const GUIDELINES = [
  "Relevant to metal cutting: CNC machining, cutting tools, automation, additive manufacturing, or the broader Indian manufacturing supply chain.",
  "Newsworthy: a launch, partnership, expansion, funding, appointment, or milestone — not an evergreen product pitch.",
  "Complete: company name, what happened, why it matters, a quote if you have one, and a contact for follow-up questions.",
  "Ready to publish: send final copy. We may lightly edit for clarity and house style.",
];

export default function SubmitPressReleasePage() {
  return (
    <>
      <ListingHeader
        eyebrow="For Companies & PR Teams"
        title="Submit a Press Release"
        description="Reach the engineers, plant managers, and procurement teams who actually buy in this industry."
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm formType="press-release" submitLabel="Submit Press Release" showCompany />
          </div>
          <aside>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-steel-500)]">
                What we look for
              </p>
              <ul className="space-y-3">
                {GUIDELINES.map((g) => (
                  <li key={g} className="flex gap-2.5 text-sm text-[var(--color-navy-700)]/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-spark-500)]" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-2xl bg-[var(--color-navy-950)] p-6 text-sm text-steel-300">
              Our editorial team reviews every submission. Publishing decisions and timing are
              at Knowmatics&apos; discretion; we&apos;ll follow up by email either way.
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
