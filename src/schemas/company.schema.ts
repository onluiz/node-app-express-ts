import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;
