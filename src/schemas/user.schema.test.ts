import { describe, it, expect } from 'vitest';
import {
  UserSchema,
  UserIdParamsSchema,
  UserQuerySchema,
  CreateUserBodySchema,
  UpdateUserBodySchema,
} from '@/schemas';

describe('User Schemas', () => {
  const validUser = {
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

  describe('UserSchema', () => {
    it('should validate a valid user', () => {
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should reject user with invalid email', () => {
      const result = UserSchema.safeParse({
        ...validUser,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('UserIdParamsSchema', () => {
    it('should parse valid id param', () => {
      const result = UserIdParamsSchema.safeParse({ id: '1' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(1);
      }
    });

    it('should reject negative id', () => {
      const result = UserIdParamsSchema.safeParse({ id: '-1' });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric id', () => {
      const result = UserIdParamsSchema.safeParse({ id: 'abc' });
      expect(result.success).toBe(false);
    });
  });

  describe('UserQuerySchema', () => {
    it('should parse valid query with username', () => {
      const result = UserQuerySchema.safeParse({ username: 'Bret' });
      expect(result.success).toBe(true);
    });

    it('should parse valid query with email', () => {
      const result = UserQuerySchema.safeParse({ email: 'test@example.com' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = UserQuerySchema.safeParse({ email: 'not-an-email' });
      expect(result.success).toBe(false);
    });

    it('should allow empty query', () => {
      const result = UserQuerySchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe('CreateUserBodySchema', () => {
    it('should validate valid create body', () => {
      const result = CreateUserBodySchema.safeParse({
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const result = CreateUserBodySchema.safeParse({
        name: 'Test User',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = CreateUserBodySchema.safeParse({
        name: 'Test User',
        username: 'testuser',
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const result = CreateUserBodySchema.safeParse({
        name: '',
        username: 'testuser',
        email: 'test@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const result = CreateUserBodySchema.safeParse({
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        phone: '123-456-7890',
        website: 'https://example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid url for website', () => {
      const result = CreateUserBodySchema.safeParse({
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        website: 'not-a-url',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('UpdateUserBodySchema', () => {
    it('should allow partial update', () => {
      const result = UpdateUserBodySchema.safeParse({
        name: 'Updated Name',
      });
      expect(result.success).toBe(true);
    });

    it('should allow empty body', () => {
      const result = UpdateUserBodySchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
