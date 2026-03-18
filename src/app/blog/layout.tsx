import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              FC
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FlowCrate
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition">
              Blog
            </Link>
            <Link href="/#templates" className="hover:text-foreground transition">
              Templates
            </Link>
            <Link href="/#pricing" className="hover:text-foreground transition">
              Pricing
            </Link>
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex h-7 items-center justify-center rounded-lg bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground hover:bg-primary/80 transition"
          >
            Get Early Access
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
              FC
            </div>
            <span className="text-sm font-medium">FlowCrate</span>
          </Link>
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
