import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["Active", "Inactive"]),
  tags: z.string().optional(),
  assignedTo: z.string().min(1, "Assigned person is required"),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
