import type {
  AttendanceRecord,
  Child,
  Family,
  Invoice,
  MessageThread,
  Organization,
  StaffMember,
  UserProfile
} from "@/types/domain";

export const organization: Organization = {
  id: "org-kid-city-usa-1",
  name: "Kid City USA",
  shortName: "Kid City",
  timezone: "America/New_York",
  plan: "scale"
};

export const currentUser: UserProfile = {
  id: "user-1",
  organizationId: organization.id,
  name: "Amelia Director",
  email: "amelia@kidcityusa.com",
  role: "director"
};

export const families: Family[] = [
  {
    id: "fam-1",
    organizationId: organization.id,
    primaryContact: "Jordan Lee",
    email: "jordan@example.com",
    phone: "(555) 204-1122",
    balance: 620,
    status: "past_due"
  },
  {
    id: "fam-2",
    organizationId: organization.id,
    primaryContact: "Avery Chen",
    email: "avery@example.com",
    phone: "(555) 918-7714",
    balance: 0,
    status: "current"
  },
  {
    id: "fam-3",
    organizationId: organization.id,
    primaryContact: "Morgan Patel",
    email: "morgan@example.com",
    phone: "(555) 441-0291",
    balance: 240,
    status: "current"
  }
];

export const children: Child[] = [
  {
    id: "child-1",
    organizationId: organization.id,
    familyId: "fam-1",
    name: "Noah Lee",
    status: "active",
    classroom: "Pre-K Owls",
    ageGroup: "4 years",
    pickupStatus: "pin_required",
    allergySummary: "Peanut allergy"
  },
  {
    id: "child-2",
    organizationId: organization.id,
    familyId: "fam-2",
    name: "Luna Chen",
    status: "active",
    classroom: "Toddlers Tidepool",
    ageGroup: "2 years",
    pickupStatus: "normal",
    allergySummary: "No known allergies"
  },
  {
    id: "child-3",
    organizationId: organization.id,
    familyId: "fam-3",
    name: "Mila Patel",
    status: "waitlist",
    classroom: "Preschool Garden",
    ageGroup: "3 years",
    pickupStatus: "restricted",
    allergySummary: "Dairy sensitivity"
  }
];

export const attendance: AttendanceRecord[] = [
  {
    id: "att-1",
    organizationId: organization.id,
    childName: "Noah Lee",
    classroom: "Pre-K Owls",
    checkedInAt: "7:38 AM",
    status: "checked_in",
    latePickup: false
  },
  {
    id: "att-2",
    organizationId: organization.id,
    childName: "Luna Chen",
    classroom: "Toddlers Tidepool",
    checkedInAt: "8:02 AM",
    status: "checked_in",
    latePickup: false
  },
  {
    id: "att-3",
    organizationId: organization.id,
    childName: "Mila Patel",
    classroom: "Preschool Garden",
    checkedInAt: "Scheduled",
    status: "scheduled",
    latePickup: false
  }
];

export const invoices: Invoice[] = [
  {
    id: "inv-1001",
    organizationId: organization.id,
    family: "Jordan Lee",
    dueDate: "Apr 20",
    total: 620,
    status: "overdue"
  },
  {
    id: "inv-1002",
    organizationId: organization.id,
    family: "Avery Chen",
    dueDate: "Apr 18",
    total: 1240,
    status: "issued"
  },
  {
    id: "inv-1003",
    organizationId: organization.id,
    family: "Morgan Patel",
    dueDate: "Apr 15",
    total: 240,
    status: "paid"
  }
];

export const messages: MessageThread[] = [
  {
    id: "msg-1",
    organizationId: organization.id,
    title: "Owls classroom update",
    type: "classroom",
    lastMessage: "We shared spring garden photos and tomorrow's snack list.",
    unreadCount: 6
  },
  {
    id: "msg-2",
    organizationId: organization.id,
    title: "Jordan Lee billing",
    type: "direct",
    lastMessage: "Can we split April tuition across two cards?",
    unreadCount: 2
  },
  {
    id: "msg-3",
    organizationId: organization.id,
    title: "May family picnic",
    type: "announcement",
    lastMessage: "Draft announcement scheduled for Monday at 9:00 AM.",
    unreadCount: 0
  }
];

export const staff: StaffMember[] = [
  {
    id: "staff-1",
    organizationId: organization.id,
    name: "Sofia Ramirez",
    roleLabel: "Lead Teacher",
    classroom: "Pre-K Owls",
    certificationsDue: 1,
    status: "active"
  },
  {
    id: "staff-2",
    organizationId: organization.id,
    name: "Henry Brooks",
    roleLabel: "Front Desk",
    classroom: "Operations",
    certificationsDue: 0,
    status: "active"
  },
  {
    id: "staff-3",
    organizationId: organization.id,
    name: "Priya Shah",
    roleLabel: "Assistant Teacher",
    classroom: "Toddlers Tidepool",
    certificationsDue: 2,
    status: "onboarding"
  }
];
