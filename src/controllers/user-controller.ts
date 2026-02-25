import type { Request, Response } from 'express';
import {
  CreateUserBodySchema,
  UpdateUserBodySchema,
  UserIdParamsSchema,
  UserQuerySchema,
} from '@/schemas';
import { userService } from '@/services/user-service';
import { asyncHandler } from '@/utils/async-handler';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const validatedQuery = UserQuerySchema.parse(req.query);
  const { username, email } = validatedQuery;

  const users = await userService.getUsersByQuery(username, email);

  res.json({
    success: true,
    data: users,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = UserIdParamsSchema.parse(req.params);
  const user = await userService.getUserById(validatedParams.id);

  res.json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedBody = CreateUserBodySchema.parse(req.body);
  const user = await userService.createUser(validatedBody);

  res.status(201).json({
    success: true,
    data: user,
    message: 'User created successfully',
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = UserIdParamsSchema.parse(req.params);
  const validatedBody = UpdateUserBodySchema.parse(req.body);
  const user = await userService.updateUser(validatedParams.id, validatedBody);

  res.json({
    success: true,
    data: user,
    message: 'User updated successfully',
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = UserIdParamsSchema.parse(req.params);
  await userService.deleteUser(validatedParams.id);

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});
