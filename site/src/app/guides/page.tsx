import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { PageHeader } from "@/components/page-header";
import { CTABlock } from "@/components/cta-block";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Setup Guides | Ray Finance",
  description:
    "Step-by-step guides for setting up Ray. Get your API keys, connect your bank, and start talking to your money.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  return (
    <>
      <Nav minimal />
      <main className="min-h-screen bg-stone-50 pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <PageHeader
            label="Guides"
            title="Setup guides"
            subtitle="Everything you need to get Ray up and running. Each guide takes 5 minutes or less."
          />

          {/* Featured: Beginner's Guide */}
          <Link
            href="/guides/beginners"
            className="group mb-8 block rounded-xl border-2 border-stone-900 bg-white p-6 transition-colors hover:bg-stone-50"
          >
            <p className="mb-1 font-mono text-xs tracking-wide text-stone-400 uppercase">
              New to Ray?
            </p>
            <h2 className="text-lg font-bold tracking-tight text-stone-950 group-hover:text-stone-700">
              Beginner&apos;s guide — start here
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-500">
              Never used a terminal before? This guide walks you through every
              step from opening your terminal to talking to your money.
            </p>
            <p className="mt-3 text-xs font-medium text-stone-400">
              17 steps · ~15 minutes →
            </p>
          </Link>

          <div className="grid gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-xl border border-stone-200 bg-white p-6 transition-colors hover:border-stone-300"
              >
                <h2 className="text-lg font-bold tracking-tight text-stone-950 group-hover:text-stone-700">
                  {guide.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                  {guide.subtitle.split(". ")[0]}.
                </p>
                <p className="mt-3 text-xs font-medium text-stone-400">
                  {guide.steps.length} steps →
                </p>
              </Link>
            ))}
          </div>
        </div>
        <CTABlock />
      </main>
    </>
  );
}
