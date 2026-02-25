import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userApi } from '@/api/user.api';
import type { User } from '@/models';
import { UserService } from '@/services';

vi.mock('axios');
vi.mock('@/api/user.api');

const mockedUserApi = vi.mocked(userApi);

vi.mocked(axios.isAxiosError).mockImplementation((error: unknown) => {
  return (error as { isAxiosError?: boolean })?.isAxiosError === true;
});

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      mockedUserApi.getAll.mockResolvedValueOnce([mockUser]);

      const result = await userService.getAllUsers();

      expect(result).toEqual([mockUser]);
      expect(mockedUserApi.getAll).toHaveBeenCalled();
    });

    it('should throw error when fetch fails', async () => {
      mockedUserApi.getAll.mockRejectedValueOnce(new Error('Network error'));

      await expect(userService.getAllUsers()).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      mockedUserApi.getById.mockResolvedValueOnce(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw 404 when user not found', async () => {
      const mockError = new Error('Request failed with status code 404');
      (mockError as { isAxiosError: boolean }).isAxiosError = true;
      (mockError as { response: { status: number } }).response = { status: 404 };
      mockedUserApi.getById.mockRejectedValueOnce(mockError);

      await expect(userService.getUserById(999)).rejects.toThrow('User not found');
    });
  });

  describe('getUsersByQuery', () => {
    it('should filter users by username', async () => {
      mockedUserApi.getAll.mockResolvedValueOnce([mockUser]);

      const result = await userService.getUsersByQuery('Bret');

      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('Bret');
    });

    it('should filter users by email', async () => {
      mockedUserApi.getAll.mockResolvedValueOnce([mockUser]);

      const result = await userService.getUsersByQuery(undefined, 'Sincere@april.biz');

      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('Sincere@april.biz');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      mockedUserApi.getAll.mockResolvedValueOnce([mockUser]);

      const newUser = await userService.createUser({
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
      });

      expect(newUser.name).toBe('Test User');
      expect(newUser.username).toBe('testuser');
      expect(newUser.email).toBe('test@example.com');
    });
  });

  describe('updateUser', () => {
    it('should update existing user', async () => {
      mockedUserApi.getById.mockResolvedValueOnce(mockUser);

      const updated = await userService.updateUser(1, { name: 'Updated Name' });

      expect(updated.name).toBe('Updated Name');
      expect(updated.email).toBe(mockUser.email);
    });
  });

  describe('deleteUser', () => {
    it('should not throw when user exists', async () => {
      mockedUserApi.getById.mockResolvedValueOnce(mockUser);

      await expect(userService.deleteUser(1)).resolves.not.toThrow();
    });
  });
});
