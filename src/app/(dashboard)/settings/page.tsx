import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[
        ["School profile", "Organization profile, branding, operating hours, and portal visibility settings."],
        ["Billing settings", "Invoice schedules, payment retries, late fee rules, and Stripe configuration."],
        ["Notifications", "Email/SMS templates, channels, and delivery provider setup."],
        ["Role permissions", "Centralized role-based access rules mapped to sensitive actions."]
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
