export const childStatuses = ["active", "waitlist", "inactive", "graduated"] as const;
export const attendanceStatuses = ["checked_in", "checked_out", "absent", "scheduled"] as const;
export const invoiceStatuses = ["draft", "issued", "paid", "overdue", "void"] as const;
export const staffStatuses = ["active", "inactive", "onboarding"] as const;
export const conversationTypes = ["direct", "classroom", "announcement"] as const;

export type ChildStatus = (typeof childStatuses)[number];
export type AttendanceStatus = (typeof attendanceStatuses)[number];
export type InvoiceStatus = (typeof invoiceStatuses)[number];
export type StaffStatus = (typeof staffStatuses)[number];
export type ConversationType = (typeof conversationTypes)[number];
