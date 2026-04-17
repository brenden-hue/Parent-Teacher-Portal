import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { children, families } from "@/lib/mock-data";

export default function ChildDetailPage({ params }: { params: { id: string } }) {
  const child = children.find((record) => record.id === params.id);

  if (!child) {
    notFound();
  }

  const family = families.find((record) => record.id === child.familyId);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Child profile</p>
              <CardTitle className="mt-2 text-3xl">{child.name}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {child.classroom} · {child.ageGroup}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="success">{child.status}</Badge>
              <Button variant="outline">Create daily report</Button>
            </div>
          </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Family & pickup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Primary guardian</p>
                <p className="font-medium">{family?.primaryContact}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pickup status</p>
                <Badge variant={child.pickupStatus === "restricted" ? "danger" : "warning"}>{child.pickupStatus}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Emergency contact</p>
                <p className="font-medium">Taylor Lee · (555) 302-4491</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Health & documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Medical summary</p>
                <p className="font-medium">{child.allergySummary}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Documents</p>
                <p className="font-medium">Immunization record, allergy action plan</p>
              </div>
              <div>
                <p className="text-muted-foreground">Authorized pickups</p>
                <p className="font-medium">Jordan Lee, Taylor Lee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-2xl bg-rose-50 p-4 text-rose-700">PIN verification required for afternoon pickup.</div>
          <div className="rounded-2xl bg-amber-50 p-4 text-amber-700">Allergy action plan renewal due next month.</div>
          <div className="rounded-2xl bg-sky-50 p-4 text-sky-700">Parent prefers billing reminders by SMS.</div>
        </CardContent>
      </Card>
    </div>
  );
}
