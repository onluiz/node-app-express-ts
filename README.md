# Node Express API

A Node.js Express API built with TypeScript, following best practices and modern patterns.

## Features

- TypeScript with strict mode
- Express.js server
- Zod schema validation
- MVC architecture
- Unit tests with Vitest
- Linting with Biome

## Live Demo

https://node-app-express.vercel.app

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | List all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

Query parameters for `/users`: `username`, `email`

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Compile TypeScript |
| `pnpm start` | Run compiled code |
| `pnpm test` | Run tests (watch mode) |
| `pnpm test:run` | Run tests once |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm format` | Format code |
| `pnpm typecheck` | Type check |

## Project Structure

```
src/
├── api/              # External API clients
├── config/           # Configuration
├── controllers/      # Route handlers
├── middleware/       # Express middleware
├── models/           # TypeScript interfaces
├── routes/           # Route definitions
├── schemas/          # Zod validation schemas
├── services/         # Business logic
├── utils/            # Utilities
└── index.ts          # Entry point
```

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Zod
- Vitest
- Biome
