import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — FlowCrate | AI Workflow Automation Insights",
  description:
    "Learn about n8n templates, AI workflow automation, and business process optimization. Practical guides and comparisons from the FlowCrate team.",
  openGraph: {
    title: "Blog — FlowCrate",
    description:
      "AI workflow automation insights, n8n templates, and practical guides.",
    url: "https://flow-crate.com/blog",
    siteName: "FlowCrate",
    type: "website",
  },
};

const articles = [
  {
    slug: "best-n8n-templates-2026",
    title: "10 Best n8n Templates for Business Automation in 2026",
    date: "March 15, 2026",
    excerpt:
      "Discover the most impactful n8n templates that are transforming how businesses automate in 2026 — from AI content generation to smart lead scoring.",
    tag: "Templates",
  },
  {
    slug: "n8n-vs-zapier",
    title: "n8n vs Zapier in 2026: Why Businesses Are Switching",
    date: "March 12, 2026",
    excerpt:
      "A detailed comparison of n8n and Zapier covering features, pricing, self-hosting, and why more teams are migrating to open-source automation.",
    tag: "Comparison",
  },
  {
    slug: "ai-lead-scoring-automation",
    title: "How to Automate Lead Scoring with AI (Step-by-Step Guide)",
    date: "March 8, 2026",
    excerpt:
      "Build an automated AI lead scoring system using n8n and Claude. Prioritize your best leads and close deals faster with this hands-on tutorial.",
    tag: "Tutorial",
  },
  {
    slug: "abandoned-cart-recovery-ai",
    title: "AI Abandoned Cart Recovery: Recover 25% of Lost Sales",
    date: "March 5, 2026",
    excerpt:
      "Learn how AI-powered abandoned cart recovery workflows can win back a quarter of your lost revenue with personalized, perfectly-timed outreach.",
    tag: "E-commerce",
  },
  {
    slug: "n8n-ai-workflows",
    title: "5 AI Workflows Every n8n User Should Deploy Today",
    date: "March 1, 2026",
    excerpt:
      "Quick-win AI automations you can deploy right now in n8n — from smart email triage to automatic content repurposing and sentiment analysis.",
    tag: "AI Workflows",
  },
];

export default function BlogIndex() {
  return (
    <div className="px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Practical guides on AI workflow automation, n8n templates, and
            scaling your business with intelligent processes.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block rounded-xl border border-border/50 p-6 hover:border-primary/30 hover:bg-muted/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {article.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.date}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
