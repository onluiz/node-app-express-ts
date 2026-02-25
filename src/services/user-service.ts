import axios from 'axios';
import { userApi } from '@/api/user.api';
import type { User } from '@/models';
import type { CreateUserBody, UpdateUserBody } from '@/schemas';
import { AppError } from '@/utils/app-error';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      return await userApi.getAll();
    } catch (_error) {
      throw new AppError(500, 'Failed to fetch users');
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await userApi.getById(id);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new AppError(404, 'User not found');
      }
      throw new AppError(500, 'Failed to fetch user');
    }
  }

  async getUsersByQuery(username?: string, email?: string): Promise<User[]> {
    const users = await this.getAllUsers();
    let filtered = users;

    if (username) {
      filtered = filtered.filter((user) => user.username.toLowerCase() === username.toLowerCase());
    }

    if (email) {
      filtered = filtered.filter((user) => user.email.toLowerCase() === email.toLowerCase());
    }

    return filtered;
  }

  async createUser(_body: CreateUserBody): Promise<User> {
    const users = await this.getAllUsers();
    const newId = Math.max(...users.map((u) => u.id)) + 1;

    const newUser: User = {
      id: newId,
      name: _body.name,
      username: _body.username,
      email: _body.email,
      phone: _body.phone || '',
      website: _body.website || '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' },
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };

    return newUser;
  }

  async updateUser(id: number, body: UpdateUserBody): Promise<User> {
    const user = await this.getUserById(id);

    return {
      ...user,
      ...body,
    };
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id);
  }
}

export const userService = new UserService();
