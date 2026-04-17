import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export function DataTable<T extends { id: string }>({
  title,
  subtitle,
  columns,
  rows
}: {
  title: string;
  subtitle: string;
  columns: TableColumn<T>[];
  rows: T[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Badge variant="info">{rows.length} records</Badge>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                {columns.map((column) => (
                  <th className="px-3 py-3 font-medium" key={String(column.key)}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="border-b last:border-b-0" key={row.id}>
                  {columns.map((column) => (
                    <td className="px-3 py-4" key={String(column.key)}>
                      {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
