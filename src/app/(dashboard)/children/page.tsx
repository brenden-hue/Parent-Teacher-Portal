import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import { children, families } from "@/lib/mock-data";

export default function ChildrenPage() {
  return (
    <DataTable
      columns={[
        {
          key: "name",
          label: "Child",
          render: (_, row) => (
            <Link className="font-medium text-primary" href={`/children/${row.id}`}>
              {row.name}
            </Link>
          )
        },
        { key: "classroom", label: "Classroom" },
        { key: "ageGroup", label: "Age" },
        {
          key: "status",
          label: "Status",
          render: (value) => <Badge variant={value === "active" ? "success" : value === "waitlist" ? "warning" : "default"}>{String(value)}</Badge>
        },
        {
          key: "familyId",
          label: "Family",
          render: (value) => families.find((family) => family.id === value)?.primaryContact ?? "Unknown"
        },
        {
          key: "pickupStatus",
          label: "Pickup",
          render: (value) => (
            <Badge variant={value === "restricted" ? "danger" : value === "pin_required" ? "warning" : "info"}>{String(value)}</Badge>
          )
        }
      ]}
      rows={children}
      subtitle="Active enrollments, waitlist visibility, and quick access to child records."
      title="Children"
    />
  );
}
