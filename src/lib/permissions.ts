export type AppRole =
  | "platform_admin"
  | "school_admin"
  | "director"
  | "front_desk"
  | "teacher"
  | "parent_guardian"
  | "billing_manager";

type Ability =
  | "children.read"
  | "children.write"
  | "attendance.manage"
  | "billing.manage"
  | "messages.manage"
  | "staff.manage"
  | "reports.read"
  | "settings.manage";

const roleAbilities: Record<AppRole, Ability[]> = {
  platform_admin: [
    "children.read",
    "children.write",
    "attendance.manage",
    "billing.manage",
    "messages.manage",
    "staff.manage",
    "reports.read",
    "settings.manage"
  ],
  school_admin: [
    "children.read",
    "children.write",
    "attendance.manage",
    "billing.manage",
    "messages.manage",
    "staff.manage",
    "reports.read",
    "settings.manage"
  ],
  director: [
    "children.read",
    "children.write",
    "attendance.manage",
    "messages.manage",
    "staff.manage",
    "reports.read"
  ],
  front_desk: ["children.read", "attendance.manage", "messages.manage"],
  teacher: ["children.read", "attendance.manage", "messages.manage"],
  parent_guardian: ["children.read", "messages.manage"],
  billing_manager: ["children.read", "billing.manage", "reports.read"]
};

export function can(role: AppRole, ability: Ability) {
  return roleAbilities[role]?.includes(ability) ?? false;
}
