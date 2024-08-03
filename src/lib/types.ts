import { z } from "zod";

export const SignatureDataSchema = z.object({
  name: z.string().optional(),
  pronouns: z.string().optional(),
  emailAddress: z.string().email().optional(),
  jobTitle: z.string().optional(),
});

export type SignatureData = z.infer<typeof SignatureDataSchema>;
