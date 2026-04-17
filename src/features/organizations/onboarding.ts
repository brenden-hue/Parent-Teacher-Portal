import { z } from "zod";

export const organizationOnboardingSchema = z.object({
  organizationName: z.string().min(2),
  timezone: z.string().min(2),
  firstAdminName: z.string().min(2),
  firstAdminEmail: z.string().email()
});

export type OrganizationOnboardingInput = z.infer<typeof organizationOnboardingSchema>;
