import { z } from 'zod';
import { GeoSchema } from './geo.schema';

export const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

export type Address = z.infer<typeof AddressSchema>;
