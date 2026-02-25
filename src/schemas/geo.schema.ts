import { z } from 'zod';

export const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export type Geo = z.infer<typeof GeoSchema>;
