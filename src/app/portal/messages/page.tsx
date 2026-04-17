import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { messages } from "@/lib/mock-data";

export default function PortalMessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((thread) => (
          <div className="rounded-2xl border p-4" key={thread.id}>
            <p className="font-medium">{thread.title}</p>
            <p className="text-sm text-muted-foreground">{thread.lastMessage}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
