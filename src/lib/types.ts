import { z } from "zod";

export const SignatureDataSchema = z.object({
  name: z.string(),
  pronouns: z.string(),
  emailAddress: z.string().email(),
  jobTitle: z.string(),
});

export type SignatureData = z.infer<typeof SignatureDataSchema>;
