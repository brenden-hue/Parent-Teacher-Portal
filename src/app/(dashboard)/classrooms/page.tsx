import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const classrooms = [
  { id: "pre-k-owls", name: "Pre-K Owls", ageGroup: "4-5 years", enrolled: 18, capacity: 20, ratio: "1:10", activeAttendance: 16 },
  { id: "toddlers-tidepool", name: "Toddlers Tidepool", ageGroup: "18-36 months", enrolled: 12, capacity: 14, ratio: "1:6", activeAttendance: 11 },
  { id: "preschool-garden", name: "Preschool Garden", ageGroup: "3-4 years", enrolled: 15, capacity: 18, ratio: "1:8", activeAttendance: 13 }
];

export default function ClassroomsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {classrooms.map((classroom) => (
        <Card key={classroom.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>
                  <Link className="text-primary" href={`/classrooms/${classroom.id}`}>
                    {classroom.name}
                  </Link>
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{classroom.ageGroup}</p>
              </div>
              <Badge variant="info">{classroom.ratio}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Enrollment: {classroom.enrolled}/{classroom.capacity}</p>
            <p>Active attendance today: {classroom.activeAttendance}</p>
            <p>Teacher assignments and ratio visibility ready for live data.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
