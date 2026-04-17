import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import { staff } from "@/lib/mock-data";

export default function StaffPage() {
  return (
    <DataTable
      columns={[
        { key: "name", label: "Staff member" },
        { key: "roleLabel", label: "Role" },
        { key: "classroom", label: "Assignment" },
        {
          key: "certificationsDue",
          label: "Credential alerts",
          render: (value) => <Badge variant={Number(value) > 0 ? "warning" : "success"}>{Number(value) > 0 ? `${value} due` : "Current"}</Badge>
        },
        {
          key: "status",
          label: "Status",
          render: (value) => <Badge variant={value === "active" ? "success" : "info"}>{String(value)}</Badge>
        }
      ]}
      rows={staff}
      subtitle="Records, schedules, certifications, and role-aware staff operations."
      title="Staff"
    />
  );
}
