import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { invoices } from "@/lib/mock-data";
import { currency } from "@/lib/utils";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Collected this month</p>
            <CardTitle className="text-3xl">$42,800</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Stripe-ready payments, manual entries, and auto-pay reconciliation.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Outstanding A/R</p>
            <CardTitle className="text-3xl">$6,240</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Family balances, late fees, and upcoming retries for failed auto-pay.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Auto-pay success</p>
            <CardTitle className="text-3xl">94%</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Commercial billing foundation with subscription-ready architecture.</CardContent>
        </Card>
      </section>
      <DataTable
        columns={[
          { key: "id", label: "Invoice" },
          { key: "family", label: "Family" },
          { key: "dueDate", label: "Due" },
          {
            key: "total",
            label: "Amount",
            render: (value) => currency(Number(value))
          },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <Badge variant={value === "paid" ? "success" : value === "overdue" ? "danger" : "info"}>{String(value)}</Badge>
            )
          }
        ]}
        rows={invoices}
        subtitle="Tuition plans, invoice engine, payment entries, and overdue follow-up."
        title="Billing overview"
      />
    </div>
  );
}
