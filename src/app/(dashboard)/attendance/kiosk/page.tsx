import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KioskPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card className="rounded-[32px]">
        <CardHeader className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Kiosk Mode</p>
          <CardTitle className="text-4xl">Check in securely</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "Help", "0", "Enter"].map((key) => (
              <button className="h-16 rounded-2xl border bg-slate-50 text-lg font-semibold" key={key}>
                {key}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-900 p-5 text-center text-white">
            Enter family PIN to check in, check out, or validate pickup authorization.
          </div>
          <Button className="w-full">Open staff override</Button>
        </CardContent>
      </Card>
    </div>
  );
}
