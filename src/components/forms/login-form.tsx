"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@school.com",
      password: "password123"
    }
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Secure Access</p>
        <CardTitle className="text-3xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="h-11 w-full rounded-xl border bg-white px-3 outline-none ring-0"
              id="email"
              {...form.register("email")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="h-11 w-full rounded-xl border bg-white px-3 outline-none ring-0"
              id="password"
              type="password"
              {...form.register("password")}
            />
          </div>
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
