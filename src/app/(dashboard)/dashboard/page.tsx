import { KpiCard } from "@/components/cards/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendance, children, invoices, messages, staff } from "@/lib/mock-data";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const checkedIn = attendance.filter((row) => row.status === "checked_in").length;
  const overdueBalance = invoices.filter((invoice) => invoice.status === "overdue").reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Children enrolled" value={String(children.length)} detail="Active, waitlist, and newly onboarded children across classrooms." />
        <KpiCard title="Checked in now" value={String(checkedIn)} detail="Live attendance snapshot for front desk and classroom teams." />
        <KpiCard title="Overdue balances" value={currency(overdueBalance)} detail="Families needing billing follow-up or auto-pay recovery." />
        <KpiCard title="Unread messages" value={String(messages.reduce((sum, row) => sum + row.unreadCount, 0))} detail="Direct parent threads, classroom updates, and announcements." />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Operational priorities</CardTitle>
            <p className="text-sm text-muted-foreground">Key workflows that make the MVP useful on day one.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Attendance corrections", "2 check-ins need director review before payroll cutoff.", "warning"],
              ["Pickup restrictions", "Noah Lee requires a PIN-verified pickup this afternoon.", "danger"],
              ["Billing follow-up", "Jordan Lee has an overdue balance and requested a split payment plan.", "info"]
            ].map(([title, body, variant]) => (
              <div className="rounded-2xl border bg-slate-50 p-4" key={title}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{title}</p>
                  <Badge variant={variant as "warning" | "danger" | "info"}>{variant}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Staff coverage</CardTitle>
            <p className="text-sm text-muted-foreground">Ratio visibility and credential alerts.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {staff.map((member) => (
              <div className="flex items-center justify-between rounded-2xl border p-4" key={member.id}>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.roleLabel} · {member.classroom}
                  </p>
                </div>
                <Badge variant={member.certificationsDue > 0 ? "warning" : "success"}>
                  {member.certificationsDue > 0 ? `${member.certificationsDue} expiring` : "Current"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
