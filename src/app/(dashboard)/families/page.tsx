import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import { families } from "@/lib/mock-data";
import { currency } from "@/lib/utils";

export default function FamiliesPage() {
  return (
    <DataTable
      columns={[
        { key: "primaryContact", label: "Primary contact" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        {
          key: "balance",
          label: "Balance",
          render: (value) => currency(Number(value))
        },
        {
          key: "status",
          label: "Status",
          render: (value) => <Badge variant={value === "past_due" ? "warning" : "success"}>{String(value)}</Badge>
        }
      ]}
      rows={families}
      subtitle="Family accounts, communication preferences, and shared billing context."
      title="Families"
    />
  );
}
