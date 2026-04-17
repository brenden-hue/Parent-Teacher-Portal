"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Bell,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Wallet
} from "lucide-react";

import { currentUser, organization } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/children", label: "Children", icon: Users },
  { href: "/families", label: "Families", icon: Users },
  { href: "/attendance", label: "Attendance", icon: Bell },
  { href: "/classrooms", label: "Classrooms", icon: BookOpen },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/staff", label: "Staff", icon: Wallet },
  { href: "/reports", label: "Reports", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({
  children
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[28px] border bg-white/80 p-5 shadow-panel backdrop-blur">
          <div className="mb-8 rounded-2xl bg-hero-grid p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">ChildcareApp</p>
            <h1 className="mt-3 text-2xl font-semibold">{organization.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Modern operations for schools, directors, and families.</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-dashed bg-slate-50 p-4 text-sm">
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-muted-foreground">{currentUser.role.replace("_", " ")}</p>
          </div>
        </aside>
        <div className="space-y-6">
          <header className="flex flex-col gap-4 rounded-[28px] border bg-white/80 px-6 py-5 shadow-panel backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Commercial MVP foundation</p>
              <h2 className="text-2xl font-semibold">Operations console</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border bg-slate-50 px-4 py-2 text-sm text-muted-foreground">
                Search children, families, invoices, messages...
              </div>
              <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">New action</div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
