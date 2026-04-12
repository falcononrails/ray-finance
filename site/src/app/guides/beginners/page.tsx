import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { CTABlock } from "@/components/cta-block";
import { RelatedLinks } from "@/components/related-links";
import { beginnersGuide } from "@/data/beginners-guide";

export const metadata: Metadata = {
  title: beginnersGuide.metaTitle,
  description: beginnersGuide.metaDescription,
  alternates: {
    canonical: "/guides/beginners",
  },
};

function renderBody(text: string) {
  return text.split("`").map((part, j) =>
    j % 2 === 1 ? (
      <code
        key={j}
        className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-stone-900"
      >
        {part}
      </code>
    ) : (
      <span key={j}>
        {part.split("\n\n").map((para, k) => (
          <span key={k}>
            {k > 0 && (
              <>
                <br />
                <br />
              </>
            )}
            {para}
          </span>
        ))}
      </span>
    )
  );
}

export default function BeginnersGuidePage() {
  const { sections } = beginnersGuide;

  let stepCounter = 0;
  const totalSteps = sections.reduce((sum, s) => sum + s.steps.length, 0);

  const relatedLinks = [
    {
      href: "/guides/get-anthropic-api-key",
      label: "How to get an Anthropic API key",
      description: "Detailed walkthrough for getting your AI key.",
    },
    {
      href: "/guides/get-plaid-credentials",
      label: "How to get Plaid credentials",
      description: "Detailed walkthrough for getting your bank connection keys.",
    },
    {
      href: "/guides/why-local-first",
      label: "Why local-first matters",
      description: "How Ray keeps your financial data private.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: beginnersGuide.title,
    description: beginnersGuide.subtitle,
    url: "https://rayfinance.app/guides/beginners",
    totalTime: "PT15M",
    step: sections.flatMap((section) =>
      section.steps.map((s) => ({
        "@type": "HowToStep",
        name: s.title,
        text: s.body,
      }))
    ),
  };

  return (
    <>
      <Nav minimal />
      <main className="min-h-screen bg-stone-50 pt-24">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { label: "Guides", href: "/guides" },
                { label: "Beginner's Guide" },
              ]}
            />
            <PageHeader
              label="Guide"
              title={beginnersGuide.title}
              subtitle={beginnersGuide.subtitle}
            />
          </div>

          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
            {/* Table of contents — desktop only */}
            <aside className="hidden lg:block">
              <nav
                aria-label="Table of contents"
                className="sticky top-28 space-y-1"
              >
                <p className="mb-3 font-mono text-xs tracking-wide text-stone-400 uppercase">
                  On this page
                </p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-1.5 text-sm text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div className="mx-auto max-w-3xl space-y-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-bold tracking-tight text-stone-950">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-2 leading-relaxed text-stone-500">
                      {section.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-8">
                    {section.steps.map((step, i) => {
                      stepCounter++;
                      const currentStep = stepCounter;
                      const isLastInSection = i === section.steps.length - 1;

                      return (
                        <div key={i} className="relative pl-10">
                          <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white">
                            {currentStep}
                          </div>
                          {!isLastInSection && (
                            <div className="absolute left-[13px] top-8 bottom-[-16px] w-px bg-stone-200" />
                          )}
                          <h3 className="text-lg font-bold tracking-tight text-stone-950">
                            {step.title}
                          </h3>
                          <p className="mt-2 leading-relaxed text-stone-600">
                            {renderBody(step.body)}
                          </p>
                          {step.link && (
                            <a
                              href={step.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-sm text-stone-400 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600"
                            >
                              {new URL(step.link).hostname.replace("www.", "")} →
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* Completion message */}
              <div className="rounded-xl border border-lime-200 bg-lime-50 p-6">
                <p className="mb-1 font-mono text-xs tracking-wide text-lime-600 uppercase">
                  All {totalSteps} steps complete
                </p>
                <p className="font-bold text-stone-950">
                  You're all set.
                </p>
                <p className="mt-1 leading-relaxed text-stone-600">
                  Ray is installed, connected to your bank, and syncing daily. Just
                  type{" "}
                  <code className="rounded bg-lime-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-stone-900">
                    ray
                  </code>{" "}
                  anytime to talk to your money.
                </p>
              </div>

              <div className="mt-12">
                <RelatedLinks title="Detailed guides" links={relatedLinks} />
              </div>
            </div>
          </div>
        </div>
        <CTABlock />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
