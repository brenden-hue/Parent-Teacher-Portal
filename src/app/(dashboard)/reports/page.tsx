import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        ["Enrollment", "Track active enrollments, waitlist flow, and classroom utilization."],
        ["Revenue", "Review billed, collected, overdue, and projected tuition trends."],
        ["Attendance", "Visualize check-in patterns, absences, and late pickup exceptions."],
        ["Staffing", "Watch ratio compliance, certifications due, and time tracking summaries."],
        ["Collections", "Measure failed auto-pay retries and family balance aging."],
        ["Saved views", "Prepare for saved report definitions and dashboard preferences."]
      ].map(([title, body]) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
        </Card>
      ))}
    </div>
  );
}
