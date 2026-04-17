import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { attendance } from "@/lib/mock-data";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Checked in", "28", "Live occupancy for classroom ratio monitoring."],
          ["Pending pickups", "6", "Children still on site and not yet checked out."],
          ["Exceptions", "2", "Late pickups, manual edits, and attendance corrections."]
        ].map(([title, value, body]) => (
          <Card key={title}>
            <CardHeader>
              <p className="text-sm text-muted-foreground">{title}</p>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
          </Card>
        ))}
      </section>
      <DataTable
        columns={[
          { key: "childName", label: "Child" },
          { key: "classroom", label: "Classroom" },
          { key: "checkedInAt", label: "Check-in" },
          {
            key: "status",
            label: "Status",
            render: (value) => <Badge variant={value === "checked_in" ? "success" : value === "scheduled" ? "info" : "default"}>{String(value)}</Badge>
          },
          {
            key: "latePickup",
            label: "Flags",
            render: (value) => <Badge variant={value ? "warning" : "default"}>{value ? "Late pickup" : "None"}</Badge>
          }
        ]}
        rows={attendance}
        subtitle="Manual check-in/out, kiosk validation, and correction workflows."
        title="Attendance"
      />
    </div>
  );
}
