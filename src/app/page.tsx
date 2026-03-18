"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ── Workflow preview mock (makes it feel like a real product) ── */
function WorkflowPreview() {
  return (
    <div className="relative mx-auto max-w-3xl mt-16 px-4">
      <div className="rounded-2xl border border-white/[0.08] bg-[#111] p-1 shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-[11px] text-white/30 ml-2 font-mono">n8n — AI Lead Scoring Pipeline</span>
        </div>
        {/* Workflow canvas */}
        <div className="p-6 flex items-center justify-center gap-3 overflow-hidden">
          {[
            { label: "Webhook", color: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
            { label: "Enrich", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
            { label: "Claude AI", color: "bg-violet-500/20 border-violet-500/40 text-violet-300" },
            { label: "Score", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
            { label: "Slack", color: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
          ].map((node, i) => (
            <div key={node.label} className="flex items-center gap-3">
              <div className={`rounded-lg border px-3 py-2 text-xs font-medium ${node.color} whitespace-nowrap`}>
                {node.label}
              </div>
              {i < 4 && (
                <svg width="20" height="8" viewBox="0 0 20 8" className="text-white/20 shrink-0">
                  <path d="M0 4h16m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent rounded-3xl blur-2xl" />
    </div>
  );
}

/* ── Language selector ── */
function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const langs = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
    { code: "es", label: "ES" },
    { code: "fr", label: "FR" },
    { code: "de", label: "DE" },
    { code: "ja", label: "JA" },
    { code: "zh", label: "ZH" },
    { code: "ar", label: "AR" },
  ];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition px-2 py-1 rounded border border-white/[0.08] hover:border-white/20"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        EN
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-1 z-50 min-w-[56px]">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Data ── */
const bundles = [
  {
    name: "AI Content Factory",
    price: 97,
    count: 5,
    accent: "violet",
    popular: true,
    items: [
      "Blog → 10 Social Media Posts",
      "YouTube → Blog + Newsletter",
      "AI SEO Article Writer",
      "Content Calendar Generator",
      "Social Media Scheduler",
    ],
  },
  {
    name: "Sales & Lead Gen",
    price: 127,
    count: 5,
    accent: "emerald",
    popular: false,
    items: [
      "AI Lead Enrichment & Scoring",
      "Cold Email AI Personalizer",
      "LinkedIn Lead Scraper",
      "CRM Auto-Sync",
      "Meeting Booker + Follow-up",
    ],
  },
  {
    name: "E-commerce Autopilot",
    price: 97,
    count: 5,
    accent: "amber",
    popular: false,
    items: [
      "Abandoned Cart Recovery",
      "Competitor Price Monitor",
      "Review Request Automation",
      "Inventory Alerts + Reorder",
      "Order → Invoice → Accounting",
    ],
  },
  {
    name: "Support & Ops AI",
    price: 97,
    count: 5,
    accent: "sky",
    popular: false,
    items: [
      "AI Ticket Triage & Auto-Reply",
      "Customer Onboarding Sequence",
      "Knowledge Base AI Bot",
      "Newsletter Autopilot",
      "Weekly Business Report",
    ],
  },
];

const accentMap: Record<string, { border: string; bg: string; dot: string }> = {
  violet: { border: "border-violet-500/20", bg: "bg-violet-500/[0.04]", dot: "bg-violet-400" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/[0.04]", dot: "bg-emerald-400" },
  amber: { border: "border-amber-500/20", bg: "bg-amber-500/[0.04]", dot: "bg-amber-400" },
  sky: { border: "border-sky-500/20", bg: "bg-sky-500/[0.04]", dot: "bg-sky-400" },
};

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
      /* show success anyway */
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-[11px] font-extrabold text-black tracking-tight">FC</span>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white/90">FlowCrate</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-white/40">
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <a
              href="#waitlist"
              className="hidden sm:inline-flex h-8 items-center rounded-md bg-white px-3.5 text-[13px] font-medium text-black hover:bg-white/90 transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-28 sm:pt-36 pb-8 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/50">Launching Soon</span>
          </div>
          <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-bold tracking-[-0.03em] leading-[1.08] mb-5">
            AI Workflows That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              Actually Work.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-10">
            Production-ready n8n templates with Claude AI.
            <br className="hidden sm:block" />{" "}
            Import, configure, deploy. Stop rebuilding what already exists.
          </p>

          {/* Waitlist */}
          <div id="waitlist" className="mx-auto max-w-sm">
            {submitted ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-4">
                <p className="text-emerald-400 text-sm font-medium">
                  You&apos;re in. Check your email for a free template.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus-visible:border-white/20 focus-visible:ring-0"
                  required
                />
                <Button
                  type="submit"
                  className="h-10 bg-white text-black hover:bg-white/90 font-medium px-5 shrink-0"
                >
                  Join Waitlist
                </Button>
              </form>
            )}
            <p className="mt-3 text-[11px] text-white/25">
              Free AI template included. No spam.
            </p>
          </div>
        </div>

        <WorkflowPreview />
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.04] mt-12">
        <div className="mx-auto max-w-3xl grid grid-cols-4 divide-x divide-white/[0.04]">
          {[
            { v: "20+", l: "Templates" },
            { v: "5 min", l: "Avg Setup" },
            { v: "4", l: "Bundles" },
            { v: "24/7", l: "Running" },
          ].map((s) => (
            <div key={s.l} className="py-8 text-center">
              <div className="text-xl sm:text-2xl font-semibold tracking-tight">{s.v}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3 text-center">How It Works</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-14">Three Steps to Automation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Pick a Bundle", d: "Choose the automation pack for your use case — content, sales, e-commerce, or ops." },
              { n: "02", t: "Import to n8n", d: "Copy the JSON into your n8n instance. Each template has a setup guide." },
              { n: "03", t: "Go Live", d: "Add your API keys, activate, and let AI handle the rest." },
            ].map((s) => (
              <div key={s.n} className="group">
                <span className="text-[11px] font-mono text-white/20 group-hover:text-white/40 transition">{s.n}</span>
                <h3 className="text-[15px] font-semibold mt-2 mb-2">{s.t}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Template Bundles ── */}
      <section id="templates" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3 text-center">Templates</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">Template Bundles</h2>
          <p className="text-sm text-white/35 text-center mb-14 max-w-lg mx-auto">
            5 production-ready workflows per bundle. AI built-in. Documentation included.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {bundles.map((b) => {
              const a = accentMap[b.accent];
              return (
                <div
                  key={b.name}
                  className={`relative rounded-xl border ${a.border} ${a.bg} p-5 transition-colors hover:border-opacity-40`}
                >
                  {b.popular && (
                    <Badge className="absolute top-4 right-4 bg-white/[0.06] text-white/50 border-0 text-[10px] font-normal">
                      Popular
                    </Badge>
                  )}
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                    <h3 className="text-[15px] font-semibold">{b.name}</h3>
                  </div>
                  <p className="text-[11px] text-white/25 mb-4">{b.count} workflows</p>
                  <ul className="space-y-1.5 mb-5">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-2 text-[13px] text-white/50">
                        <span className="text-white/15 text-[10px]">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-bold">${b.price}</span>
                      <span className="text-[11px] text-white/25 ml-1">one-time</span>
                    </div>
                    <button className="text-[12px] font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-md transition-colors">
                      Get This Bundle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All Access ── */}
      <section id="pricing" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">All Access Pass</h2>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Best Value</span>
            </div>
            <p className="text-sm text-white/35 mb-6">Every template. Every update. Unlimited.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">$149</span>
              <span className="text-white/30 text-sm">/month</span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                "All 20+ templates",
                "New templates monthly",
                "Video setup guides",
                "Priority Discord support",
                "Request custom templates",
                "Cancel anytime",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/50">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-emerald-400 shrink-0">
                    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full h-10 bg-white text-black hover:bg-white/90 font-medium">
              Get All Access
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3 text-center">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-14">Questions & Answers</h2>
          <div className="space-y-8">
            {[
              {
                q: "What is n8n?",
                a: "An open-source workflow automation tool — like Zapier, but self-hosted and more powerful. Our templates are pre-built workflows you import directly.",
              },
              {
                q: "Do I need coding skills?",
                a: "No. Import the JSON, add your API keys, activate. Each template has a step-by-step guide.",
              },
              {
                q: "Which AI models are used?",
                a: "Most templates use Claude by Anthropic. Some support GPT-4. You need your own API key.",
              },
              {
                q: "Can I modify templates?",
                a: "Yes. Everything is fully editable inside n8n. Make them yours.",
              },
              {
                q: "What\u2019s your refund policy?",
                a: "30-day money-back guarantee. If it doesn\u2019t work for you, full refund.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="text-[15px] font-medium mb-1.5">{item.q}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Stop Rebuilding.<br />Start Shipping.
          </h2>
          <p className="text-sm text-white/35 mb-8">
            Join the waitlist for early access and a free template.
          </p>
          <a
            href="#waitlist"
            className="inline-flex h-10 items-center rounded-md bg-white px-6 text-[13px] font-medium text-black hover:bg-white/90 transition-colors"
          >
            Get Early Access
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-white flex items-center justify-center">
              <span className="text-[8px] font-extrabold text-black">FC</span>
            </div>
            <span className="text-[13px] font-medium text-white/50">FlowCrate</span>
          </div>
          <p className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} FlowCrate. All rights reserved.
          </p>
          <div className="flex gap-5 text-[11px] text-white/25">
            <a href="#" className="hover:text-white/60 transition">Twitter</a>
            <a href="#" className="hover:text-white/60 transition">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
