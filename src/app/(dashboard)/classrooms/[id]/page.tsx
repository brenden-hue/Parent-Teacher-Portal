import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const classrooms = [
  { id: "pre-k-owls", name: "Pre-K Owls", ageGroup: "4-5 years", ratio: "1:10", lead: "Sofia Ramirez", attendance: 16, capacity: 20 },
  { id: "toddlers-tidepool", name: "Toddlers Tidepool", ageGroup: "18-36 months", ratio: "1:6", lead: "Priya Shah", attendance: 11, capacity: 14 },
  { id: "preschool-garden", name: "Preschool Garden", ageGroup: "3-4 years", ratio: "1:8", lead: "Alex Turner", attendance: 13, capacity: 18 }
];

export default function ClassroomDetailPage({ params }: { params: { id: string } }) {
  const classroom = classrooms.find((item) => item.id === params.id);

  if (!classroom) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Classroom</p>
              <CardTitle className="mt-2 text-3xl">{classroom.name}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{classroom.ageGroup}</p>
            </div>
            <Badge variant="info">{classroom.ratio}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Lead teacher</p>
            <p className="mt-2 font-medium">{classroom.lead}</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Attendance today</p>
            <p className="mt-2 font-medium">{classroom.attendance}</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Capacity</p>
            <p className="mt-2 font-medium">{classroom.capacity}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ratio alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">Classroom is currently within ratio.</div>
          <div className="rounded-2xl bg-sky-50 p-4 text-sky-700">Two children are scheduled for a late pickup today.</div>
        </CardContent>
      </Card>
    </div>
  );
}
