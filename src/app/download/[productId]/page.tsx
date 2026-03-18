import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BUNDLES: Record<
  string,
  { name: string; templates: { name: string; file: string }[] }
> = {
  "bundle-content": {
    name: "AI Content Factory",
    templates: [
      { name: "Blog → 10 Social Posts (AI)", file: "ai-content/blog-to-social-media.json" },
      { name: "YouTube → Blog + Newsletter", file: "ai-content/youtube-to-blog.json" },
      { name: "AI SEO Article Writer", file: "ai-content/seo-article-writer.json" },
      { name: "30-Day Content Calendar", file: "social-media/content-calendar.json" },
      { name: "Social Media Scheduler", file: "social-media/social-scheduler.json" },
    ],
  },
  "bundle-sales": {
    name: "Sales & Lead Gen Machine",
    templates: [
      { name: "AI Lead Enrichment & Scoring", file: "lead-generation/ai-lead-enrichment.json" },
      { name: "Cold Email AI Personalizer", file: "lead-generation/cold-email-ai.json" },
      { name: "LinkedIn Lead Scraper + Outreach", file: "lead-generation/linkedin-scraper.json" },
      { name: "Universal CRM Auto-Sync", file: "lead-generation/crm-sync.json" },
      { name: "Meeting Booker + Follow-up", file: "lead-generation/meeting-booker.json" },
    ],
  },
  "bundle-ecommerce": {
    name: "E-commerce Autopilot",
    templates: [
      { name: "Abandoned Cart Recovery (AI)", file: "ecommerce/abandoned-cart-recovery.json" },
      { name: "Competitor Price Monitor", file: "data-scraping/competitor-price-monitor.json" },
      { name: "Review Request Automation", file: "ecommerce/review-request.json" },
      { name: "Inventory Alert System", file: "ecommerce/inventory-alerts.json" },
      { name: "Order → Invoice → Accounting", file: "ecommerce/order-invoice-accounting.json" },
    ],
  },
  "bundle-support": {
    name: "Support & Ops AI",
    templates: [
      { name: "AI Ticket Triage & Auto-Reply", file: "customer-support/ai-ticket-triage.json" },
      { name: "Knowledge Base AI Bot", file: "customer-support/knowledge-base-bot.json" },
      { name: "Customer Onboarding Sequence", file: "customer-support/onboarding-sequence.json" },
      { name: "AI Newsletter Autopilot", file: "email-marketing/newsletter-autopilot.json" },
      { name: "Weekly Report Generator", file: "seo-analytics/weekly-report.json" },
    ],
  },
};

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const bundle = BUNDLES[productId];

  if (!bundle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">
            ↓
          </div>
          <h1 className="text-3xl font-bold mb-2">Download Your Templates</h1>
          <p className="text-muted-foreground">
            {bundle.name} — {bundle.templates.length} production-ready workflows
          </p>
        </div>

        <div className="space-y-3">
          {bundle.templates.map((template, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="shrink-0">
                    {i + 1}
                  </Badge>
                  <span className="text-sm font-medium">{template.name}</span>
                </div>
                <Button size="sm" variant="outline">
                  Download .json
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">How to Import</h3>
            <ol className="text-sm text-muted-foreground text-left space-y-2 max-w-md mx-auto">
              <li>
                <strong>1.</strong> Open your n8n instance
              </li>
              <li>
                <strong>2.</strong> Click <strong>Import from File</strong> (or
                paste JSON)
              </li>
              <li>
                <strong>3.</strong> Add your API keys (Claude, etc.)
              </li>
              <li>
                <strong>4.</strong> Activate the workflow — done!
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Join our Discord or reply to your purchase email.
          </p>
          <a
            href="/"
            className="text-sm text-primary hover:underline"
          >
            ← Back to FlowCrate
          </a>
        </div>
      </div>
    </div>
  );
}
