import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--color-spark-600)]">
        404
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--color-navy-950)] sm:text-4xl">
        This page has been machined away.
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-navy-700)]/85">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-[var(--color-navy-950)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-navy-800)]"
      >
        Back to homepage
      </Link>
    </Container>
  );
}
