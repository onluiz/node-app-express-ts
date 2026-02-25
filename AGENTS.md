# Agent Guidelines for node-app-express

This document provides guidelines for agents working on this codebase.

## Project Overview

- **Type**: Node.js Express API
- **Language**: TypeScript
- **Package Manager**: pnpm

## Commands

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Compile TypeScript to JavaScript
pnpm start        # Run compiled JavaScript
```

### Testing
```bash
pnpm test         # Run all tests
pnpm test:run    # Run tests once (no watch mode)
pnpm test -- <pattern>    # Run tests matching pattern (e.g., pnpm test -- user.test.ts)
pnpm test -- --testNamePattern="name"  # Run specific test by name
```

### Linting & Formatting
```bash
pnpm lint         # Run Biome lint
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code with Biome
```

### Type Checking
```bash
pnpm typecheck    # Run TypeScript type checking
```

## Code Style Guidelines

### TypeScript
- Use strict mode in TypeScript (`strict: true` in tsconfig)
- Avoid `any`, use `unknown` when type is uncertain
- Use interfaces for object shapes, types for unions/intersections
- Enable `esModuleInterop: true` in tsconfig

### Naming Conventions
- **Files**: kebab-case (e.g., `user-controller.ts`, `auth-middleware.ts`)
- **Classes**: PascalCase (e.g., `UserController`, `AuthService`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces**: PascalCase, optionally with `I` prefix (e.g., `IUser`, `UserResponse`)

### Imports
- Use path aliases configured in tsconfig (e.g., `@/controllers/*`, `@/models`, `@/schemas`)
- Order imports: external libraries → internal modules → relative paths
- Use named exports for utilities, default exports for classes
- Use barrel files (`index.ts`) to export modules

```typescript
// Preferred import order
import express from 'express';
import { UserService } from '@/services/user-service';
import { userApi } from '@/api/user.api';
import type { User } from '@/models';
import { UserSchema } from '@/schemas';
```

### Error Handling
- Use custom error classes extending `Error` or `HttpError`
- Always return appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
- Use try-catch in async route handlers with asyncHandler wrapper
- Log errors with appropriate context

```typescript
// Custom error example
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Async handler wrapper
const asyncHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

### REST API Patterns
- Use proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Resource routes: `/resources` (list), `/resources/:id` (single)
- Use plural nouns for resources
- Return consistent response formats

```typescript
// Response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Configuration
- Store config in `.env` files (never commit secrets)
- Use `dotenv` for loading environment variables
- Create `.env.example` for required variables

### Testing
- Use Vitest for unit and integration tests
- Test files: `*.test.ts` or `*.spec.ts` colocated with source
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies

### File Structure
```
src/
├── api/              # External API clients
│   ├── index.ts      # Barrel export
│   └── user.api.ts   # API calls for user resource
├── config/           # Configuration files
├── controllers/      # Route handlers
│   ├── index.ts      # Barrel export
│   └── user-controller.ts
├── middleware/       # Express middleware
├── models/           # TypeScript interfaces/types
│   ├── index.ts      # Barrel export
│   ├── user.ts       # User interface
│   ├── address.ts    # Address interface
│   └── api-response.ts
├── routes/           # Route definitions
│   ├── index.ts      # Barrel export
│   └── user-routes.ts
├── schemas/          # Zod validation schemas
│   ├── index.ts      # Barrel export
│   ├── user.schema.ts
│   ├── user-params.schema.ts
│   ├── user-query.schema.ts
│   └── user-body.schema.ts
├── services/         # Business logic
│   ├── index.ts      # Barrel export
│   └── user-service.ts
├── utils/            # Utility functions
│   ├── index.ts      # Barrel export
│   ├── async-handler.ts
│   └── app-error.ts
└── index.ts          # Entry point
```

### Barrel Files
Create `index.ts` files in each directory to export all modules:

```typescript
// src/models/index.ts
export * from './user';
export * from './address';
export * from './company';
export * from './api-response';

// src/schemas/index.ts
export * from './user.schema';
export * from './user-params.schema';
export * from './user-query.schema';
export * from './user-body.schema';

// src/api/index.ts
export * from './user.api';

// src/controllers/index.ts
export * from './user-controller';

// src/routes/index.ts
export * from './user-routes';

// src/utils/index.ts
export * from './async-handler';
export * from './app-error';

// src/services/index.ts
export * from './user-service';
```

### Schema Validation (Zod)
- Each Zod schema should be in its own file under `src/schemas/`
- Use descriptive names: `user.schema.ts`, `user-params.schema.ts`, `user-query.schema.ts`, `user-body.schema.ts`
- Export both schema and inferred type

```typescript
// src/schemas/user.schema.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  // ...
});

export type User = z.infer<typeof UserSchema>;
```

### Models
- Each TypeScript interface/type should be in its own file under `src/models/`
- Use separate files for nested types (e.g., `address.ts`, `company.ts`)
- Export types from barrel file

### API Layer
- External API calls go in `src/api/`
- Use a separate file for each resource (e.g., `user.api.ts`)
- Services should call the API layer, not axios directly

```typescript
// src/api/user.api.ts
import axios from 'axios';
import type { User } from '@/models';

const API_BASE_URL = 'https://api.example.com';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  },
  getById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },
};
```

### General Practices
- Keep functions small and focused (single responsibility)
- Use meaningful variable/function names
- Add JSDoc comments for public APIs
- Commit frequently with descriptive messages
- Run lint/typecheck before committing
