import { z } from 'zod';

export const UserQuerySchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
});

export type UserQuery = z.infer<typeof UserQuerySchema>;
