import { z } from 'zod';

export const CreateUserBodySchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
});

export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

export const UpdateUserBodySchema = CreateUserBodySchema.partial();

export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;
