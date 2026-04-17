import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { children } from "@/lib/mock-data";

export default function PortalChildrenPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {children.slice(0, 2).map((child) => (
        <Card key={child.id}>
          <CardHeader>
            <CardTitle>{child.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{child.classroom}</p>
            <p>{child.ageGroup}</p>
            <p>{child.allergySummary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
