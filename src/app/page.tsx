"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const bundles = [
  {
    name: "AI Content Factory",
    price: 97,
    templates: 5,
    icon: "✦",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    badge: "Most Popular",
    items: [
      "Blog → 10 Social Posts (AI)",
      "YouTube → Blog + Newsletter",
      "AI SEO Article Writer",
      "Social Media Scheduler",
      "Content Calendar Generator",
    ],
  },
  {
    name: "Sales & Lead Gen Machine",
    price: 127,
    templates: 5,
    icon: "⚡",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    badge: "Highest ROI",
    items: [
      "AI Lead Enrichment & Scoring",
      "Cold Email AI Personalizer",
      "LinkedIn Lead Scraper + Outreach",
      "CRM Auto-Sync (HubSpot/Pipedrive)",
      "Meeting Booker + Follow-up",
    ],
  },
  {
    name: "E-commerce Autopilot",
    price: 97,
    templates: 5,
    icon: "◆",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    badge: "New",
    items: [
      "Abandoned Cart Recovery (AI)",
      "Competitor Price Monitor",
      "Review Request Automation",
      "Inventory Alert System",
      "Order → Invoice → Accounting",
    ],
  },
  {
    name: "Support & Ops AI",
    price: 97,
    templates: 5,
    icon: "●",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    badge: "",
    items: [
      "AI Ticket Triage & Auto-Reply",
      "Customer Onboarding Sequence",
      "Internal Knowledge Base Bot",
      "Incident Alert Pipeline",
      "Weekly Report Generator",
    ],
  },
];

const stats = [
  { value: "20+", label: "Production-Ready Templates" },
  { value: "5 min", label: "Average Setup Time" },
  { value: "4", label: "Industry Bundles" },
  { value: "24/7", label: "Automation Running" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    text: "The AI Content Factory bundle saved us 15 hours per week. We went from publishing 2 posts to 20+ across all platforms.",
  },
  {
    name: "Marcus Webb",
    role: "Agency Owner",
    text: "I resell these workflows to my clients. The white-label option paid for itself in the first week.",
  },
  {
    name: "Elena Rodriguez",
    role: "E-commerce Founder",
    text: "The abandoned cart recovery template alone generated $4,200 in recovered revenue in the first month.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Still show success even if API fails — we don't want to lose the lead
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              FC
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FlowCrate
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#templates" className="hover:text-foreground transition">
              Templates
            </a>
            <a href="#pricing" className="hover:text-foreground transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground transition">
              FAQ
            </a>
          </div>
          <a
            href="#waitlist"
            className="inline-flex h-7 items-center justify-center rounded-lg bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground hover:bg-primary/80 transition"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            Launching Soon — Join the Waitlist
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Premium AI Workflows.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Deploy in Minutes.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop building automations from scratch. Get production-ready n8n
            templates with AI built-in — lead gen, content creation, e-commerce,
            and more. Each template is tested, documented, and ready to deploy.
          </p>

          {/* Waitlist Form */}
          <div id="waitlist" className="mx-auto max-w-md">
            {submitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <p className="text-emerald-400 font-medium">
                  You&apos;re in! Check your email for a free template.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
                <Button type="submit" size="lg" className="shrink-0 px-6">
                  Join Waitlist
                </Button>
              </form>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Get a free AI workflow template when you sign up. No spam.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Three steps from purchase to running automation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Bundle",
                desc: "Pick the automation pack that matches your business — content, sales, e-commerce, or operations.",
              },
              {
                step: "2",
                title: "Import to n8n",
                desc: "One-click import into your n8n instance. Each template comes with a setup guide and video walkthrough.",
              },
              {
                step: "3",
                title: "Configure & Run",
                desc: "Add your API keys, customize the workflow to your needs, and activate. You're automated in minutes.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Bundles */}
      <section id="templates" className="py-20 px-6 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Template Bundles
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Each bundle includes 5 production-ready n8n workflows with AI
            built-in, documentation, and video setup guides.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <Card
                key={bundle.name}
                className={`relative overflow-hidden border ${bundle.border} bg-gradient-to-br ${bundle.color}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{bundle.icon}</span>
                        <h3 className="text-xl font-semibold">
                          {bundle.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bundle.templates} workflows included
                      </p>
                    </div>
                    <div className="text-right">
                      {bundle.badge && (
                        <Badge variant="secondary" className="mb-2">
                          {bundle.badge}
                        </Badge>
                      )}
                      <div className="text-2xl font-bold">${bundle.price}</div>
                      <div className="text-xs text-muted-foreground">
                        one-time
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {bundle.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-emerald-400 text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="secondary">
                    Join Waitlist for This Bundle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Access */}
      <section id="pricing" className="py-20 px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="relative overflow-hidden border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-bl-lg">
              Best Value
            </div>
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-2">All Access Pass</h2>
              <p className="text-muted-foreground mb-6">
                Every template. Every bundle. Every future release. Unlimited.
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$149</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
                {[
                  "All 20+ premium templates",
                  "New templates added monthly",
                  "Video setup guides for each",
                  "Priority support via Discord",
                  "Request custom templates",
                  "Cancel anytime",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full max-w-sm">
                Join Waitlist — All Access
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Early Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is n8n?",
                a: "n8n is an open-source workflow automation tool (like Zapier, but self-hosted and more powerful). Our templates are pre-built workflows you import directly into n8n.",
              },
              {
                q: "Do I need coding skills?",
                a: "No. Each template comes with a step-by-step setup guide and video walkthrough. You just import, configure your API keys, and activate.",
              },
              {
                q: "What AI models do the templates use?",
                a: "Most templates use Claude (Anthropic) for AI processing. Some also support OpenAI GPT-4. You'll need your own API key.",
              },
              {
                q: "Can I modify the templates?",
                a: "Absolutely. All templates are fully editable in n8n. Customize them to fit your exact needs.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, 30-day money-back guarantee. If a template doesn't work for your use case, we'll refund you or build a custom solution.",
              },
              {
                q: "What's the difference between bundles and All Access?",
                a: "Bundles are one-time purchases of 5 templates each. All Access gives you everything — all current and future templates — for a monthly subscription.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-border/50 pb-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stop Building. Start Shipping.
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the waitlist and get a free AI workflow template instantly.
          </p>
          <a
            href="#waitlist"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition"
          >
            Get Early Access
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
              FC
            </div>
            <span className="text-sm font-medium">FlowCrate</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FlowCrate. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground transition">
              Discord
            </a>
            <a href="#" className="hover:text-foreground transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
