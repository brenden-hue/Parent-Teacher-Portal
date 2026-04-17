import type {
  AttendanceStatus,
  ChildStatus,
  ConversationType,
  InvoiceStatus,
  StaffStatus
} from "@/lib/constants/statuses";
import type { AppRole } from "@/lib/permissions";

export type Organization = {
  id: string;
  name: string;
  shortName: string;
  timezone: string;
  plan: "growth" | "scale";
};

export type UserProfile = {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: AppRole;
};

export type Family = {
  id: string;
  organizationId: string;
  primaryContact: string;
  email: string;
  phone: string;
  balance: number;
  status: "current" | "past_due";
};

export type Child = {
  id: string;
  organizationId: string;
  familyId: string;
  name: string;
  status: ChildStatus;
  classroom: string;
  ageGroup: string;
  pickupStatus: "normal" | "pin_required" | "restricted";
  allergySummary: string;
};

export type AttendanceRecord = {
  id: string;
  organizationId: string;
  childName: string;
  classroom: string;
  checkedInAt: string;
  checkedOutAt?: string;
  status: AttendanceStatus;
  latePickup: boolean;
};

export type Invoice = {
  id: string;
  organizationId: string;
  family: string;
  dueDate: string;
  total: number;
  status: InvoiceStatus;
};

export type MessageThread = {
  id: string;
  organizationId: string;
  title: string;
  type: ConversationType;
  lastMessage: string;
  unreadCount: number;
};

export type StaffMember = {
  id: string;
  organizationId: string;
  name: string;
  roleLabel: string;
  classroom: string;
  certificationsDue: number;
  status: StaffStatus;
};
