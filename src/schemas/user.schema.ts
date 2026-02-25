import { z } from 'zod';
import { AddressSchema } from './address.schema';
import { CompanySchema } from './company.schema';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});

export type User = z.infer<typeof UserSchema>;
