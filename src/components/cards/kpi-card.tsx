import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiCard({
  title,
  value,
  detail
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>
        <div className="rounded-full bg-sky-50 p-2 text-sky-700">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
