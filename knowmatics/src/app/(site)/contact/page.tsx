import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/Container";
import { ListingHeader } from "@/components/ListingHeader";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Knowmatics editorial team.",
};

export default function ContactPage() {
  return (
    <>
      <ListingHeader
        eyebrow="Get in touch"
        title="Contact Knowmatics"
        description="Questions, feedback, partnership ideas, or a story tip — we'd like to hear it."
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm formType="contact" submitLabel="Send message" />
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl bg-[var(--color-navy-950)] p-6 text-white">
              <div className="mb-3 flex items-center gap-2 text-[var(--color-spark-400)]">
                <Mail className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-widest">Email</p>
              </div>
              <a href="mailto:hello@knowmatics.in" className="text-sm text-steel-300 hover:text-white">
                hello@knowmatics.in
              </a>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[var(--color-spark-600)]">
                <MessageSquare className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-steel-500)]">
                  Have a press release instead?
                </p>
              </div>
              <p className="text-sm text-[var(--color-navy-700)]/85">
                Use the dedicated{" "}
                <a href="/submit-press-release" className="font-medium text-[var(--color-spark-600)] underline">
                  Submit a Press Release
                </a>{" "}
                form so it reaches our editorial queue directly.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
