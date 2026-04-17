import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-4 py-12">
      <section className="rounded-[32px] border bg-white/85 p-10 shadow-panel">
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Standalone Product</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-balance">
          Modern childcare operations for schools, staff, and families.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Multi-tenant SaaS foundation for enrollment, attendance, billing, classroom operations, staff management,
          and parent communication.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Open admin MVP</Button>
          </Link>
          <Link href="/portal/dashboard">
            <Button size="lg" variant="outline">
              Open parent portal
            </Button>
          </Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Tenant-aware architecture", "All tenant-owned tables are scoped by organization and prepared for RLS."],
          ["Premium admin shell", "Dashboard, lists, detail pages, and role-ready navigation are scaffolded for review."],
          ["Commercial billing foundation", "Stripe-ready billing entities and family ledger concepts are built into the schema."]
        ].map(([title, body]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
