import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortalBillingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>Current balance: $620</p>
        <p>Next auto-pay attempt: April 20</p>
        <p>Saved payment method: Visa ending in 4242</p>
      </CardContent>
    </Card>
  );
}
