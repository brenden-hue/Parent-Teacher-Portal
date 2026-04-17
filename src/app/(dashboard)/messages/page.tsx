import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { messages } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <p className="text-sm text-muted-foreground">Parent-school threads, classroom updates, announcements, and notification logging.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((thread) => (
          <div className="rounded-2xl border bg-white p-5" key={thread.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{thread.title}</p>
                  <Badge variant={thread.type === "announcement" ? "info" : "default"}>{thread.type}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{thread.lastMessage}</p>
              </div>
              <Badge variant={thread.unreadCount > 0 ? "warning" : "success"}>
                {thread.unreadCount > 0 ? `${thread.unreadCount} unread` : "Clear"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
