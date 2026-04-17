import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout/portal-shell";

export default function ParentPortalLayout({ children }: { children: ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
