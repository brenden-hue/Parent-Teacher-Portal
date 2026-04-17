create extension if not exists "pgcrypto";

create type app_role as enum ('platform_admin', 'school_admin', 'director', 'front_desk', 'teacher', 'parent_guardian', 'billing_manager');
create type child_status as enum ('active', 'waitlist', 'inactive', 'graduated');
create type attendance_status as enum ('checked_in', 'checked_out', 'absent', 'scheduled');
create type invoice_status as enum ('draft', 'issued', 'paid', 'overdue', 'void');
create type staff_status as enum ('active', 'inactive', 'onboarding');
create type conversation_type as enum ('direct', 'classroom', 'announcement');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.current_organization_id()
returns uuid
language sql
stable
as $$
  select nullif(auth.jwt() ->> 'organization_id', '')::uuid
$$;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  timezone text not null default 'America/New_York',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.organization_settings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  billing_provider text default 'stripe',
  email_provider text default 'resend',
  sms_provider text default 'twilio',
  feature_flags jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id)
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name app_role not null,
  permissions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, name)
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  email text not null,
  role app_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.user_organizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role app_role not null,
  is_default boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, organization_id)
);

create table public.families (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  primary_contact_name text not null,
  primary_contact_email text,
  primary_contact_phone text,
  billing_status text not null default 'current',
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.parents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid references public.users(id),
  full_name text not null,
  email text,
  phone text,
  relationship text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.classrooms (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  age_group text,
  capacity integer not null default 0,
  ratio_numerator integer not null default 1,
  ratio_denominator integer not null default 10,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  classroom_id uuid references public.classrooms(id) on delete set null,
  full_name text not null,
  status child_status not null default 'active',
  birth_date date,
  pickup_pin_hash text,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.child_guardians (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  parent_id uuid not null references public.parents(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  full_name text not null,
  phone text not null,
  relationship text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.authorized_pickups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  full_name text not null,
  phone text,
  requires_id_check boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.child_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  storage_path text not null,
  document_type text not null,
  expires_on date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.medical_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  allergy_notes text,
  medication_notes text,
  physician_name text,
  physician_phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.classroom_enrollments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  classroom_id uuid not null references public.classrooms(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  start_date date not null,
  end_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id),
  full_name text not null,
  job_title text,
  status staff_status not null default 'active',
  start_date date,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff_classroom_assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  classroom_id uuid not null references public.classrooms(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.attendance_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  classroom_id uuid references public.classrooms(id) on delete set null,
  status attendance_status not null,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  check_in_method text,
  edited_reason text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.staff_attendance_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  classroom_id uuid references public.classrooms(id) on delete set null,
  report_date date not null,
  summary text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  daily_report_id uuid references public.daily_reports(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  activity_type text not null,
  notes text,
  occurred_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.meals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  daily_report_id uuid references public.daily_reports(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  meal_type text not null,
  amount text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.naps (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  daily_report_id uuid references public.daily_reports(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  started_at timestamptz,
  ended_at timestamptz,
  quality text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  classroom_id uuid references public.classrooms(id) on delete set null,
  occurred_at timestamptz not null,
  severity text not null,
  summary text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.tuition_plans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  billing_frequency text not null,
  amount_cents integer not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.child_tuition_assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  tuition_plan_id uuid not null references public.tuition_plans(id) on delete cascade,
  effective_on date not null,
  ends_on date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  invoice_number text not null,
  status invoice_status not null default 'draft',
  issue_date date not null,
  due_date date not null,
  total_cents integer not null default 0,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  unique (organization_id, invoice_number)
);

create table public.invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_amount_cents integer not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  stripe_customer_id text,
  stripe_payment_method_id text,
  brand text,
  last4 text,
  is_default boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  payment_method_id uuid references public.payment_methods(id) on delete set null,
  stripe_payment_intent_id text,
  amount_cents integer not null,
  paid_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.billing_adjustments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  amount_cents integer not null,
  reason text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.late_fees (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  fee_amount_cents integer not null,
  assessed_on date not null,
  waived_on date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  classroom_id uuid references public.classrooms(id) on delete set null,
  type conversation_type not null,
  subject text,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  parent_id uuid references public.parents(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_user_id uuid references public.users(id) on delete set null,
  body text not null,
  sent_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  body text not null,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id)
);

create table public.media_uploads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  child_id uuid references public.children(id) on delete set null,
  storage_path text not null,
  mime_type text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.notification_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  channel text not null,
  target text not null,
  template_key text not null,
  status text not null,
  related_entity_type text,
  related_entity_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff_certifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  certification_type text not null,
  expires_on date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff_schedules (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  shift_date date not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.time_off_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.staff_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  storage_path text not null,
  document_type text not null,
  expires_on date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.saved_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  owner_user_id uuid references public.users(id) on delete set null,
  name text not null,
  definition jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.dashboard_preferences (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, user_id)
);

create index idx_children_org_family on public.children (organization_id, family_id);
create index idx_classrooms_org on public.classrooms (organization_id);
create index idx_attendance_logs_org_date on public.attendance_logs (organization_id, checked_in_at desc);
create index idx_invoices_org_status_due on public.invoices (organization_id, status, due_date);
create index idx_payments_org_paid_at on public.payments (organization_id, paid_at desc);
create index idx_messages_org_conversation on public.messages (organization_id, conversation_id, sent_at desc);
create index idx_staff_org_status on public.staff (organization_id, status);
create index idx_audit_logs_org_created on public.audit_logs (organization_id, created_at desc);

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'organization_settings','roles','users','user_organizations','families','parents','classrooms','children',
    'child_guardians','emergency_contacts','authorized_pickups','child_documents','medical_records',
    'classroom_enrollments','staff','staff_classroom_assignments','attendance_logs','staff_attendance_logs',
    'daily_reports','activities','meals','naps','incidents','tuition_plans','child_tuition_assignments',
    'invoices','invoice_line_items','payment_methods','payments','billing_adjustments','late_fees',
    'conversations','conversation_participants','messages','announcements','media_uploads','notification_logs',
    'staff_certifications','staff_schedules','time_off_requests','staff_documents','audit_logs','saved_reports',
    'dashboard_preferences'
  ] loop
    execute format('alter table public.%I enable row level security;', tbl);
    execute format(
      'create policy %I on public.%I for all using (organization_id = public.current_organization_id()) with check (organization_id = public.current_organization_id());',
      tbl || '_org_isolation',
      tbl
    );
  end loop;
end $$;

create trigger set_updated_at_organizations before update on public.organizations for each row execute function public.set_updated_at();
create trigger set_updated_at_org_settings before update on public.organization_settings for each row execute function public.set_updated_at();
create trigger set_updated_at_roles before update on public.roles for each row execute function public.set_updated_at();
create trigger set_updated_at_users before update on public.users for each row execute function public.set_updated_at();
create trigger set_updated_at_families before update on public.families for each row execute function public.set_updated_at();
create trigger set_updated_at_parents before update on public.parents for each row execute function public.set_updated_at();
create trigger set_updated_at_classrooms before update on public.classrooms for each row execute function public.set_updated_at();
create trigger set_updated_at_children before update on public.children for each row execute function public.set_updated_at();
create trigger set_updated_at_staff before update on public.staff for each row execute function public.set_updated_at();
create trigger set_updated_at_attendance before update on public.attendance_logs for each row execute function public.set_updated_at();
create trigger set_updated_at_daily_reports before update on public.daily_reports for each row execute function public.set_updated_at();
create trigger set_updated_at_invoices before update on public.invoices for each row execute function public.set_updated_at();
create trigger set_updated_at_payments before update on public.payments for each row execute function public.set_updated_at();
create trigger set_updated_at_conversations before update on public.conversations for each row execute function public.set_updated_at();
