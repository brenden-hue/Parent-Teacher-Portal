import type { ReactNode } from "react";
import Link from "next/link";

export function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Parent Portal</p>
            <h1 className="text-xl font-semibold">Kid City USA</h1>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/portal/dashboard">Dashboard</Link>
            <Link href="/portal/children">Children</Link>
            <Link href="/portal/billing">Billing</Link>
            <Link href="/portal/messages">Messages</Link>
            <Link href="/portal/documents">Documents</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
