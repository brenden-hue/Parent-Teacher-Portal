import { KpiCard } from "@/components/cards/kpi-card";

export default function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Children" value="2" detail="Quick access to classroom, daily reports, and pickup notes." />
        <KpiCard title="Balance due" value="$620" detail="See invoices, saved cards, and upcoming auto-pay dates." />
        <KpiCard title="Messages" value="3" detail="Secure communication with teachers, staff, and billing." />
      </section>
    </div>
  );
}
