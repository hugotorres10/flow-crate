"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

/* ── Animated gradient orbs ── */
function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] -left-[20%] h-[80vh] w-[80vh] rounded-full bg-violet-600/15 blur-[120px] animate-[drift_20s_ease-in-out_infinite]" />
      <div className="absolute -bottom-[30%] -right-[15%] h-[60vh] w-[60vh] rounded-full bg-blue-600/10 blur-[100px] animate-[drift_25s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-[20%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-emerald-500/8 blur-[80px] animate-[drift_18s_ease-in-out_infinite_2s]" />
    </div>
  );
}

/* ── Animated counter ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">
      {count}{suffix}
    </div>
  );
}

/* ── Scroll reveal ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Interactive workflow preview ── */
function WorkflowPreview() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = [
    { label: "Webhook", icon: "⚡", color: "from-orange-500 to-amber-500", desc: "Triggers on new data" },
    { label: "Enrich", icon: "🔍", color: "from-blue-500 to-cyan-500", desc: "Pulls company data" },
    { label: "Claude AI", icon: "🧠", color: "from-violet-500 to-purple-500", desc: "Scores & analyzes" },
    { label: "Route", icon: "🔀", color: "from-emerald-500 to-green-500", desc: "Sends to right team" },
    { label: "Slack", icon: "💬", color: "from-pink-500 to-rose-500", desc: "Notifies instantly" },
  ];

  return (
    <div className="relative mx-auto max-w-3xl mt-16 px-4">
      {/* Glass container */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-1 shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-white/30 ml-2 font-mono">flowcrate — AI Lead Scoring Pipeline</span>
          <div className="ml-auto flex gap-1">
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">ACTIVE</span>
          </div>
        </div>

        {/* Workflow canvas */}
        <div className="p-8 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex items-center gap-2 sm:gap-4">
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${node.color} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                <div className={`relative rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 sm:px-4 py-3 text-center transition-all duration-300 ${activeNode === i ? "border-white/20 bg-white/[0.08] scale-105" : "hover:border-white/15"}`}>
                  <span className="text-lg sm:text-xl block mb-1">{node.icon}</span>
                  <span className="text-[10px] sm:text-xs font-medium text-white/70 whitespace-nowrap">{node.label}</span>
                </div>
                {/* Tooltip */}
                {activeNode === i && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/50 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 z-10">
                    {node.desc}
                  </div>
                )}
              </div>
              {i < nodes.length - 1 && (
                <div className="flex items-center">
                  <div className={`h-px w-4 sm:w-8 transition-colors duration-500 ${activeNode !== null && (activeNode >= i) ? "bg-gradient-to-r from-white/40 to-white/20" : "bg-white/10"}`} />
                  <svg width="6" height="8" viewBox="0 0 6 8" className={`transition-colors duration-500 ${activeNode !== null && activeNode > i ? "text-white/40" : "text-white/10"}`}>
                    <path d="M1 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Execution stats bar */}
        <div className="flex items-center justify-between px-6 py-2.5 border-t border-white/[0.04] text-[10px] text-white/25 font-mono">
          <span>Last run: 2s ago</span>
          <span>847 executions today</span>
          <span className="text-emerald-400/60">0 errors</span>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-8 -z-10 bg-gradient-to-b from-violet-500/8 via-blue-500/5 to-transparent rounded-3xl blur-3xl" />
    </div>
  );
}

/* ── Logos strip ── */
function TechLogos() {
  const techs = ["n8n", "Claude AI", "Slack", "Google Sheets", "Notion", "Stripe", "HubSpot", "Shopify"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {techs.map((t) => (
        <span key={t} className="text-[11px] font-medium text-white/20 uppercase tracking-widest whitespace-nowrap">
          {t}
        </span>
      ))}
    </div>
  );
}

/* ── Data ── */
const bundles = [
  {
    name: "AI Content Factory",
    desc: "Repurpose content across channels with AI",
    price: 97,
    count: 5,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    border: "hover:border-violet-500/30",
    dot: "bg-violet-400",
    icon: "✍️",
    popular: true,
    items: [
      "Blog to 10 Social Media Posts",
      "YouTube to Blog + Newsletter",
      "AI SEO Article Writer",
      "Content Calendar Generator",
      "Social Media Scheduler",
    ],
  },
  {
    name: "Sales & Lead Gen",
    desc: "Find, score, and close leads on autopilot",
    price: 127,
    count: 5,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "hover:border-emerald-500/30",
    dot: "bg-emerald-400",
    icon: "🎯",
    popular: false,
    items: [
      "AI Lead Enrichment & Scoring",
      "Cold Email AI Personalizer",
      "LinkedIn Lead Scraper",
      "CRM Auto-Sync Pipeline",
      "Meeting Booker + Follow-up",
    ],
  },
  {
    name: "E-commerce Autopilot",
    desc: "Recover revenue and automate operations",
    price: 97,
    count: 5,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    border: "hover:border-amber-500/30",
    dot: "bg-amber-400",
    icon: "🛒",
    popular: false,
    items: [
      "Abandoned Cart Recovery",
      "Competitor Price Monitor",
      "Review Request Automation",
      "Inventory Alerts + Reorder",
      "Order to Invoice to Accounting",
    ],
  },
  {
    name: "Support & Ops AI",
    desc: "Triage, respond, and report automatically",
    price: 97,
    count: 5,
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    border: "hover:border-sky-500/30",
    dot: "bg-sky-400",
    icon: "🤖",
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

const testimonials = [
  {
    quote: "Saved our team 40+ hours per week. The AI lead scoring template alone paid for itself in the first week.",
    name: "Sarah Chen",
    role: "Head of Growth, TechScale",
    avatar: "SC",
  },
  {
    quote: "We replaced 3 Zapier accounts with one n8n instance running FlowCrate templates. 10x more powerful, 5x cheaper.",
    name: "Marcus Rivera",
    role: "Agency Owner, RiverFlow",
    avatar: "MR",
  },
  {
    quote: "The abandoned cart recovery workflow brought back $12K in revenue in the first month. No-brainer.",
    name: "Anna Weber",
    role: "E-commerce Director",
    avatar: "AW",
  },
];

const faqs = [
  {
    q: "What is n8n?",
    a: "An open-source workflow automation tool — like Zapier, but self-hosted and vastly more powerful. Our templates are production-ready workflows you import directly.",
  },
  {
    q: "Do I need coding skills?",
    a: "No. Import the JSON, add your API keys, activate. Each template has a step-by-step video guide.",
  },
  {
    q: "Which AI models are used?",
    a: "Most templates use Claude by Anthropic for best-in-class reasoning. Some support GPT-4o. You bring your own API key.",
  },
  {
    q: "Can I modify templates?",
    a: "Absolutely. Everything is fully editable inside n8n. We designed them to be customized.",
  },
  {
    q: "What's your refund policy?",
    a: "30-day money-back guarantee, no questions asked. If it doesn't deliver value, full refund.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-[#06060a] text-white antialiased selection:bg-violet-500/30">
      {/* CSS animations */}
      <style jsx global>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 8s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
        }
      `}</style>

      <GradientOrbs />

      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between rounded-b-2xl bg-white/[0.03] backdrop-blur-2xl border-x border-b border-white/[0.06] px-6 -mx-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-[11px] font-extrabold text-white tracking-tight">FC</span>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-white/90">FlowCrate</span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-[13px] text-white/35">
              <a href="#how" className="hover:text-white transition-colors duration-200">How It Works</a>
              <a href="#templates" className="hover:text-white transition-colors duration-200">Templates</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
              <Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
            </div>
            <a
              href="#waitlist"
              className="group relative inline-flex h-9 items-center rounded-lg bg-white px-4 text-[13px] font-semibold text-black overflow-hidden transition-shadow hover:shadow-lg hover:shadow-white/10"
            >
              <span className="relative z-10">Get Early Access</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 sm:pt-44 pb-8 px-6 grid-bg">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-white/50 font-medium">Launching Soon — Join 500+ on the waitlist</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] mb-6">
              AI Workflows That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
                Print Money.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg sm:text-xl text-white/35 max-w-2xl mx-auto leading-relaxed mb-10">
              Production-ready n8n templates with Claude AI baked in.
              <br className="hidden sm:block" />
              Import. Configure. Deploy. <span className="text-white/50 font-medium">Start automating in 5 minutes.</span>
            </p>
          </Reveal>

          {/* Waitlist */}
          <Reveal delay={300}>
            <div id="waitlist" className="mx-auto max-w-md">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] backdrop-blur-sm px-6 py-5">
                  <div className="flex items-center gap-3 justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="rgb(52, 211, 153)" fillOpacity="0.2" />
                      <path d="M6 10l3 3 5-5" stroke="rgb(52, 211, 153)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-emerald-400 text-sm font-medium">
                      You&apos;re in! Check your email for a free template.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex gap-2 p-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-transparent border-0 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                      required
                    />
                    <Button
                      type="submit"
                      className="h-11 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-semibold px-6 rounded-xl shrink-0 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30"
                    >
                      Join Waitlist
                    </Button>
                  </div>
                </form>
              )}
              <p className="mt-4 text-[11px] text-white/20 flex items-center justify-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/15">
                  <path d="M6 1L2 4v4c0 2.2 1.7 3.5 4 4.5 2.3-1 4-2.3 4-4.5V4L6 1z" stroke="currentColor" strokeWidth="1" />
                </svg>
                Free AI template included. Unsubscribe anytime.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <WorkflowPreview />
        </Reveal>
      </section>

      {/* ── Trusted by / Integrations ── */}
      <Reveal>
        <section className="py-16 px-6 border-t border-white/[0.04]">
          <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] text-center mb-8">Works with your favorite tools</p>
          <TechLogos />
        </section>
      </Reveal>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.04]">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.04]">
          {[
            { v: 20, s: "+", l: "Templates" },
            { v: 5, s: " min", l: "Avg Setup" },
            { v: 4, s: "", l: "AI Bundles" },
            { v: 10, s: "x", l: "ROI Average" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div className="py-10 sm:py-14 text-center">
                <AnimatedNumber target={s.v} suffix={s.s} />
                <div className="text-[11px] text-white/25 mt-1.5 uppercase tracking-widest">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-28 px-6 relative">
        <GradientOrbs />
        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <p className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 text-center">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-center mb-4">
              From Zero to Automated in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">3 Steps</span>
            </h2>
            <p className="text-sm text-white/30 text-center mb-16 max-w-lg mx-auto">No coding. No consulting. No headaches.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                icon: "📦",
                t: "Pick Your Bundle",
                d: "Choose the automation pack that matches your business — content, sales, e-commerce, or ops.",
              },
              {
                n: "02",
                icon: "⚡",
                t: "Import to n8n",
                d: "Paste the JSON into your n8n instance. Follow the included setup video — takes 5 minutes.",
              },
              {
                n: "03",
                icon: "🚀",
                t: "Watch It Run",
                d: "Add your API keys, hit activate. AI handles the rest while you focus on growth.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 150}>
                <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-[10px] font-mono text-white/15 border border-white/[0.06] rounded-full px-2 py-0.5">{s.n}</span>
                    </div>
                    <h3 className="text-[16px] font-semibold mb-2.5">{s.t}</h3>
                    <p className="text-[13px] text-white/30 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Template Bundles ── */}
      <section id="templates" className="py-28 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 text-center">Templates</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-center mb-4">
              Pick Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">Power Pack</span>
            </h2>
            <p className="text-sm text-white/30 text-center mb-16 max-w-lg mx-auto">
              5 production-ready workflows per bundle. AI built-in. Video guides included.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {bundles.map((b, i) => (
              <Reveal key={b.name} delay={i * 100}>
                <div className={`group relative rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300 ${b.border} hover:shadow-lg hover:shadow-black/20`}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

                  {b.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 px-2.5 py-1 rounded-full border border-violet-500/20">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-xl">{b.icon}</span>
                      <h3 className="text-[16px] font-bold">{b.name}</h3>
                    </div>
                    <p className="text-[12px] text-white/30 mb-5">{b.desc}</p>

                    <ul className="space-y-2 mb-6">
                      {b.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/45 group-hover:text-white/60 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/20 shrink-0">
                            <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-end justify-between pt-4 border-t border-white/[0.04]">
                      <div>
                        <span className="text-3xl font-bold">${b.price}</span>
                        <span className="text-[11px] text-white/20 ml-1.5">one-time</span>
                      </div>
                      <button className="text-[12px] font-semibold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.08] hover:border-white/20 px-4 py-2 rounded-lg transition-all duration-200">
                        Get Bundle →
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Access ── */}
      <section id="pricing" className="py-28 px-6 border-t border-white/[0.04] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.02] via-transparent to-transparent" />
        <div className="mx-auto max-w-lg relative z-10">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500" />

              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">All Access Pass</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-300 px-3 py-1 rounded-full border border-violet-500/20">
                    Best Value
                  </span>
                </div>
                <p className="text-sm text-white/30 mb-8">Every template. Every update. Unlimited access.</p>

                <div className="mb-8">
                  <span className="text-5xl font-extrabold">$149</span>
                  <span className="text-white/25 text-lg">/month</span>
                </div>

                <ul className="space-y-3 mb-10">
                  {[
                    "All 20+ premium templates",
                    "New templates added monthly",
                    "Video setup guides for each",
                    "Priority Discord support",
                    "Request custom templates",
                    "Cancel anytime — no lock-in",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-white/50">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald-400">
                          <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button className="w-full h-12 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-semibold text-[15px] rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all">
                  Get All Access
                </Button>
                <p className="text-[11px] text-white/15 text-center mt-4">30-day money-back guarantee</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 text-center">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-center mb-16">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Builders</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-colors">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="rgb(250, 204, 21)" className="text-yellow-400">
                        <path d="M7 1l1.8 3.6L13 5.3l-2.8 2.7.7 3.9L7 9.8l-3.9 2.1.7-3.9L1 5.3l4.2-.7L7 1z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[14px] text-white/45 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/[0.08] flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white/60">{t.avatar}</span>
                    </div>
                    <div>
                      <div className="text-[13px] font-medium">{t.name}</div>
                      <div className="text-[11px] text-white/25">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 text-center">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-center mb-16">
              Questions & Answers
            </h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/[0.1]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <h3 className="text-[15px] font-medium pr-4">{item.q}</h3>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`text-white/20 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}
                    >
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-5 pb-5 text-[13px] text-white/30 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 grid-bg" />
        <div className="mx-auto max-w-lg text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] mb-4">
              Stop Rebuilding.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
                Start Shipping.
              </span>
            </h2>
            <p className="text-sm text-white/30 mb-10 max-w-sm mx-auto">
              Join the waitlist for early access, a free template, and exclusive launch pricing.
            </p>
            <a
              href="#waitlist"
              className="inline-flex h-12 items-center rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 px-8 text-[15px] font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all"
            >
              Get Early Access →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <span className="text-[8px] font-extrabold text-white">FC</span>
            </div>
            <span className="text-[13px] font-medium text-white/40">FlowCrate</span>
          </div>
          <p className="text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} FlowCrate. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-white/20">
            <a href="#" className="hover:text-white/50 transition">Twitter</a>
            <a href="#" className="hover:text-white/50 transition">Discord</a>
            <Link href="/blog" className="hover:text-white/50 transition">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
