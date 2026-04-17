import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortalDocumentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Immunization Record.pdf</p>
        <p>Enrollment Agreement.pdf</p>
        <p>Allergy Action Plan.pdf</p>
      </CardContent>
    </Card>
  );
}
