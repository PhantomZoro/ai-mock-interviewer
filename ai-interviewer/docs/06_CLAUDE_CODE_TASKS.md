# Claude Code Task Breakdown

## Platform: Windows

All tasks in this document are designed for **Windows** development using:
- **Git Bash** as terminal
- **Docker Desktop** for containers
- **VS Code** as IDE

## How to Use This Document

This document breaks down the implementation into **specific, isolated tasks** that you can give to Claude Code. Each task:

1. Has clear inputs and outputs
2. Can be completed independently
3. Has a test to verify completion
4. Lists the files that will be created/modified

### Task Format

```
TASK ID: P0.1.1
DESCRIPTION: What needs to be done
FILES: List of files to create or modify
DEPENDENCIES: Previous tasks that must be done first
TEST: How to verify it works
PROMPT: Exact prompt to give Claude Code
```

---

## PHASE 0: Project Setup

### P0.1: Repository Setup

#### P0.1.1: Initialize Monorepo

```
TASK ID: P0.1.1
DESCRIPTION: Create monorepo structure with pnpm workspaces
FILES TO CREATE:
  - package.json
  - pnpm-workspace.yaml
  - .gitignore
  - .nvmrc
  - README.md
DEPENDENCIES: None
TEST: Running `pnpm install` should succeed

PROMPT FOR CLAUDE CODE:
---
Create a new monorepo for an AI Mock Interviewer project using pnpm workspaces.

Structure:
- apps/api (Node.js backend)
- apps/web (React frontend)
- apps/code-executor (Python service)
- packages/shared (shared types)

Root package.json should have:
- Scripts: dev, build, lint, test
- devDependencies: typescript, eslint, prettier, concurrently

Create pnpm-workspace.yaml pointing to apps/* and packages/*

Create .gitignore for Node.js + Python + common IDEs

Create .nvmrc with Node 18

Create README.md with project title and basic description
---
```

#### P0.1.2: TypeScript Configuration

```
TASK ID: P0.1.2
DESCRIPTION: Setup TypeScript base config and extend in packages
FILES TO CREATE:
  - tsconfig.base.json
  - apps/api/tsconfig.json
  - apps/web/tsconfig.json
  - packages/shared/tsconfig.json
DEPENDENCIES: P0.1.1
TEST: `tsc --noEmit` should pass in each package

PROMPT FOR CLAUDE CODE:
---
Setup TypeScript configuration for the monorepo.

Create tsconfig.base.json in root with:
- ES2022 target
- Strict mode enabled
- ESM modules
- Path aliases (@/*)
- Include all common strict options

Create tsconfig.json in apps/api extending base with:
- Node.js specific settings
- Output to dist/

Create tsconfig.json in apps/web extending base with:
- React/JSX settings
- Vite compatible settings

Create tsconfig.json in packages/shared with:
- Declaration files enabled
- Output to dist/
---
```

#### P0.1.3: ESLint and Prettier

```
TASK ID: P0.1.3
DESCRIPTION: Setup ESLint and Prettier with TypeScript support
FILES TO CREATE:
  - .eslintrc.js
  - .prettierrc
  - .prettierignore
  - apps/api/.eslintrc.js
  - apps/web/.eslintrc.js
DEPENDENCIES: P0.1.2
TEST: `npm run lint` passes

PROMPT FOR CLAUDE CODE:
---
Setup ESLint and Prettier for the TypeScript monorepo.

Root .eslintrc.js:
- TypeScript plugin
- Prettier plugin
- Import sorting
- Recommended rules

Root .prettierrc:
- Single quotes
- No semicolons
- 2 space indent
- 100 print width

apps/api/.eslintrc.js:
- Extend root
- Node.js environment

apps/web/.eslintrc.js:
- Extend root
- React and React Hooks plugins
- Browser environment

Add lint and format scripts to root package.json
---
```

---

### P0.2: Backend Skeleton

#### P0.2.1: Express Server Setup

```
TASK ID: P0.2.1
DESCRIPTION: Create basic Express server with TypeScript
FILES TO CREATE:
  - apps/api/package.json
  - apps/api/src/index.ts
  - apps/api/src/app.ts
  - apps/api/src/config/env.ts
DEPENDENCIES: P0.1.3
TEST: `npm run dev` starts server, GET /health returns 200

PROMPT FOR CLAUDE CODE:
---
Create a basic Express.js server with TypeScript in apps/api.

package.json:
- name: @ai-interviewer/api
- Scripts: dev (nodemon), build, start
- Dependencies: express, cors, helmet, dotenv
- DevDependencies: @types/express, @types/node, nodemon, ts-node

src/index.ts:
- Import app from app.ts
- Start server on PORT from env
- Log startup message

src/app.ts:
- Create Express app
- Add middleware: cors, helmet, json parser
- Add health check: GET /health returns { status: "ok", timestamp }
- Add 404 handler
- Add error handler

src/config/env.ts:
- Load dotenv
- Export typed config object with PORT, NODE_ENV, DATABASE_URL, etc.
- Validate required env vars on startup
---
```

#### P0.2.2: API Route Structure

```
TASK ID: P0.2.2
DESCRIPTION: Setup route structure with versioning
FILES TO CREATE:
  - apps/api/src/routes/index.ts
  - apps/api/src/routes/health.routes.ts
  - apps/api/src/middleware/error.middleware.ts
  - apps/api/src/utils/logger.ts
DEPENDENCIES: P0.2.1
TEST: GET /api/v1/health returns version info

PROMPT FOR CLAUDE CODE:
---
Setup Express route structure in apps/api.

src/routes/index.ts:
- Create router that combines all route modules
- Prefix all routes with /api/v1
- Export default router

src/routes/health.routes.ts:
- GET / returns { status, version, uptime, timestamp }

src/middleware/error.middleware.ts:
- Error handling middleware
- Log errors
- Return appropriate status codes
- Hide stack trace in production

src/utils/logger.ts:
- Simple console logger with levels (info, warn, error)
- Include timestamps
- Format: [LEVEL] [timestamp] message

Update app.ts to use the new route structure
---
```

---

### P0.3: Database Setup

#### P0.3.1: Docker Compose

```
TASK ID: P0.3.1
DESCRIPTION: Create Docker Compose for dev services
FILES TO CREATE:
  - docker/docker-compose.yml
DEPENDENCIES: P0.2.1
TEST: `docker-compose up -d` starts PostgreSQL and Redis

PROMPT FOR CLAUDE CODE:
---
Create docker-compose.yml in docker/ directory.

Services:
1. postgres:
   - Image: postgres:15-alpine
   - Container name: ai-interviewer-db
   - Port: 5432
   - Environment: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
   - Volume: postgres_data
   - Healthcheck with pg_isready

2. redis:
   - Image: redis:7-alpine
   - Container name: ai-interviewer-redis
   - Port: 6379
   - Volume: redis_data
   - Healthcheck with redis-cli ping

Define volumes at bottom.
---
```

#### P0.3.2: Prisma Setup

```
TASK ID: P0.3.2
DESCRIPTION: Initialize Prisma with basic User model
FILES TO CREATE:
  - apps/api/prisma/schema.prisma
DEPENDENCIES: P0.3.1
TEST: `npx prisma migrate dev` creates migration

PROMPT FOR CLAUDE CODE:
---
Setup Prisma in apps/api.

Add to package.json:
- prisma and @prisma/client dependencies
- Scripts: db:migrate, db:seed, db:studio, db:reset

Create prisma/schema.prisma:
- PostgreSQL datasource
- Client generator
- User model with:
  - id (UUID, default uuid)
  - email (unique)
  - name
  - avatarUrl (optional)
  - googleId (unique)
  - createdAt (default now)
  - updatedAt (auto update)
- Map table name to "users"
- Add indexes on email and googleId
---
```

#### P0.3.3: Database Connection

```
TASK ID: P0.3.3
DESCRIPTION: Create Prisma client and test connection
FILES TO CREATE:
  - apps/api/src/lib/prisma.ts
  - apps/api/src/routes/health.routes.ts (modify)
DEPENDENCIES: P0.3.2
TEST: Health check shows database status

PROMPT FOR CLAUDE CODE:
---
Create Prisma client in apps/api/src/lib/prisma.ts.

src/lib/prisma.ts:
- Create PrismaClient instance
- Handle connection in development (prevent multiple clients)
- Export prisma instance

Update src/routes/health.routes.ts:
- Add database connection check to health endpoint
- Return { status, database: "connected" | "disconnected", timestamp }
---
```

---

### P0.4: Frontend Skeleton

#### P0.4.1: Vite React Setup

```
TASK ID: P0.4.1
DESCRIPTION: Create React app with Vite and TypeScript
FILES TO CREATE:
  - apps/web/package.json
  - apps/web/index.html
  - apps/web/vite.config.ts
  - apps/web/src/main.tsx
  - apps/web/src/App.tsx
DEPENDENCIES: P0.1.3
TEST: `npm run dev` shows React app at localhost:5173

PROMPT FOR CLAUDE CODE:
---
Create React app with Vite in apps/web.

package.json:
- name: @ai-interviewer/web
- Scripts: dev, build, preview
- Dependencies: react, react-dom, react-router-dom
- DevDependencies: @types/react, @types/react-dom, @vitejs/plugin-react, vite

index.html:
- Basic HTML5 with root div
- Title: AI Mock Interviewer

vite.config.ts:
- React plugin
- Proxy /api requests to http://localhost:3000
- Path alias @ pointing to src/

src/main.tsx:
- Render App into root

src/App.tsx:
- Simple component with "AI Mock Interviewer" heading
- Will be replaced with router later
---
```

#### P0.4.2: TailwindCSS Setup

```
TASK ID: P0.4.2
DESCRIPTION: Add TailwindCSS with custom config
FILES TO CREATE:
  - apps/web/tailwind.config.js
  - apps/web/postcss.config.js
  - apps/web/src/index.css
DEPENDENCIES: P0.4.1
TEST: Tailwind classes work in components

PROMPT FOR CLAUDE CODE:
---
Setup TailwindCSS in apps/web.

Add dependencies: tailwindcss, postcss, autoprefixer

tailwind.config.js:
- Content paths for src/**/*.{ts,tsx}
- Extend theme with custom colors (primary, secondary)
- Add Inter font family

postcss.config.js:
- TailwindCSS and autoprefixer plugins

src/index.css:
- Tailwind directives (@tailwind base, components, utilities)
- Custom base styles for body
- Import Inter font

Update main.tsx to import index.css

Update App.tsx to use Tailwind classes
---
```

#### P0.4.3: React Router Setup

```
TASK ID: P0.4.3
DESCRIPTION: Add React Router with page structure
FILES TO CREATE:
  - apps/web/src/pages/Home.tsx
  - apps/web/src/pages/Login.tsx
  - apps/web/src/pages/Dashboard.tsx
  - apps/web/src/components/layout/Layout.tsx
  - apps/web/src/App.tsx (modify)
DEPENDENCIES: P0.4.2
TEST: Can navigate between pages

PROMPT FOR CLAUDE CODE:
---
Setup React Router in apps/web.

src/pages/Home.tsx:
- Landing page with hero section
- "Get Started" button linking to /login
- Basic styling with Tailwind

src/pages/Login.tsx:
- Login page placeholder
- "Login with Google" button (non-functional for now)

src/pages/Dashboard.tsx:
- Dashboard placeholder
- "Welcome to Dashboard" text

src/components/layout/Layout.tsx:
- Header with logo and navigation
- Main content area (children)
- Footer

src/App.tsx:
- BrowserRouter setup
- Routes: /, /login, /dashboard
- Wrap routes with Layout
---
```

---

### P0.5: Code Executor Setup

#### P0.5.1: FastAPI Service

```
TASK ID: P0.5.1
DESCRIPTION: Create Python FastAPI service
FILES TO CREATE:
  - apps/code-executor/requirements.txt
  - apps/code-executor/src/main.py
  - apps/code-executor/Dockerfile
DEPENDENCIES: P0.3.1
TEST: GET /health returns ok, POST /execute returns mock result

PROMPT FOR CLAUDE CODE:
---
Create Python FastAPI service in apps/code-executor.

requirements.txt:
- fastapi
- uvicorn
- docker (Docker SDK)
- pydantic

src/main.py:
- FastAPI app
- GET /health returns { status: "ok" }
- POST /execute accepts { language, code, stdin, timeout }
- Return mock result: { success: true, stdout: "mock output", stderr: "", execution_time_ms: 100 }

Dockerfile:
- Python 3.11 slim base
- Install requirements
- Copy src
- Run uvicorn on port 8000
---
```

#### P0.5.2: Sandbox Dockerfiles

```
TASK ID: P0.5.2
DESCRIPTION: Create Dockerfiles for code execution sandboxes
FILES TO CREATE:
  - docker/sandbox/javascript.Dockerfile
  - docker/sandbox/python.Dockerfile
  - docker/sandbox/java.Dockerfile
  - docker/sandbox/entrypoint.sh
DEPENDENCIES: P0.5.1
TEST: Can build each sandbox image

PROMPT FOR CLAUDE CODE:
---
Create sandbox Dockerfiles in docker/sandbox/.

javascript.Dockerfile:
- Node.js 18 alpine base
- Non-root user
- Working directory /code
- Copy entrypoint.sh
- Default command runs entrypoint

python.Dockerfile:
- Python 3.11 slim base
- Non-root user
- Working directory /code
- Copy entrypoint.sh
- Default command runs entrypoint

java.Dockerfile:
- OpenJDK 17 alpine base
- Non-root user
- Working directory /code
- Copy entrypoint.sh
- Default command runs entrypoint

entrypoint.sh:
- Generic script that reads code from /code/main.{ext}
- Runs appropriate command based on language env var
---
```

---

### P0.6: Integration

#### P0.6.1: Development Scripts

```
TASK ID: P0.6.1
DESCRIPTION: Create development scripts
FILES TO CREATE:
  - scripts/start-dev.sh
  - scripts/reset-db.sh
  - package.json (modify root)
DEPENDENCIES: P0.5.2
TEST: `./scripts/start-dev.sh` starts everything

PROMPT FOR CLAUDE CODE:
---
Create development scripts in scripts/.

scripts/start-dev.sh:
- Start Docker services (docker-compose up -d)
- Wait for PostgreSQL to be ready
- Wait for Redis to be ready
- Run database migrations
- Start API and Web concurrently with colored output

scripts/reset-db.sh:
- Prompt for confirmation
- Drop and recreate database
- Run migrations
- Run seed

Update root package.json scripts:
- "dev": "bash scripts/start-dev.sh"
- "docker:up": "docker-compose -f docker/docker-compose.yml up -d"
- "docker:down": "docker-compose -f docker/docker-compose.yml down"
- "db:migrate": "cd apps/api && npx prisma migrate dev"
- "db:seed": "cd apps/api && npx prisma db seed"
- "db:reset": "bash scripts/reset-db.sh"
---
```

#### P0.6.2: API Client for Frontend

```
TASK ID: P0.6.2
DESCRIPTION: Create API client utility for frontend
FILES TO CREATE:
  - apps/web/src/services/api.ts
  - apps/web/src/types/api.ts
DEPENDENCIES: P0.4.3
TEST: Can fetch from /api/v1/health in frontend

PROMPT FOR CLAUDE CODE:
---
Create API client in apps/web.

src/services/api.ts:
- Create axios instance with base URL /api/v1
- Add interceptors for auth (placeholder)
- Add interceptors for error handling
- Export typed API methods:
  - api.get<T>(url)
  - api.post<T>(url, data)
  - api.put<T>(url, data)
  - api.delete<T>(url)

src/types/api.ts:
- ApiResponse<T> type
- ApiError type
- HealthResponse type

Update Home.tsx to fetch and display health status
---
```

---

## PHASE 1: MVP Tasks

### P1.1: Authentication

#### P1.1.1: Google OAuth Backend

```
TASK ID: P1.1.1
DESCRIPTION: Implement Google OAuth with Passport.js
FILES TO CREATE:
  - apps/api/src/config/passport.ts
  - apps/api/src/routes/auth.routes.ts
  - apps/api/src/controllers/auth.controller.ts
  - apps/api/src/services/auth.service.ts
DEPENDENCIES: P0.3.3
TEST: GET /api/v1/auth/google redirects to Google

PROMPT FOR CLAUDE CODE:
---
Implement Google OAuth in apps/api.

Add dependencies: passport, passport-google-oauth20, jsonwebtoken

src/config/passport.ts:
- Configure Google OAuth strategy
- Use GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from env
- Callback URL: /api/v1/auth/google/callback
- Profile fields: email, displayName, photos

src/services/auth.service.ts:
- findOrCreateUser(googleProfile): Find user by googleId or create new
- generateTokens(user): Generate JWT access token (15min) and refresh token (7d)
- verifyToken(token): Verify and decode JWT
- refreshTokens(refreshToken): Generate new token pair

src/controllers/auth.controller.ts:
- googleAuth: Redirect to Google
- googleCallback: Handle callback, generate tokens, redirect to frontend
- refresh: Refresh tokens
- logout: Clear tokens

src/routes/auth.routes.ts:
- GET /google - Start OAuth flow
- GET /google/callback - Handle callback
- POST /refresh - Refresh tokens
- POST /logout - Logout

Update app.ts to initialize Passport
---
```

#### P1.1.2: Auth Middleware

```
TASK ID: P1.1.2
DESCRIPTION: Create JWT auth middleware
FILES TO CREATE:
  - apps/api/src/middleware/auth.middleware.ts
  - apps/api/src/types/express.d.ts
DEPENDENCIES: P1.1.1
TEST: Protected routes return 401 without token

PROMPT FOR CLAUDE CODE:
---
Create auth middleware in apps/api.

src/middleware/auth.middleware.ts:
- authMiddleware: Verify JWT from Authorization header or cookie
- Extract user from token and attach to req.user
- Return 401 if token missing or invalid
- Handle token expiration

src/types/express.d.ts:
- Extend Express Request to include user property
- Define User type with id, email, name

Create a test protected route GET /api/v1/users/me that requires auth
---
```

#### P1.1.3: Frontend Auth Flow

```
TASK ID: P1.1.3
DESCRIPTION: Implement auth flow in frontend
FILES TO CREATE:
  - apps/web/src/stores/authStore.ts
  - apps/web/src/hooks/useAuth.ts
  - apps/web/src/components/auth/ProtectedRoute.tsx
  - apps/web/src/pages/Login.tsx (modify)
  - apps/web/src/pages/AuthCallback.tsx
DEPENDENCIES: P1.1.2
TEST: Can login with Google and access dashboard

PROMPT FOR CLAUDE CODE:
---
Implement frontend auth in apps/web.

Add dependency: zustand

src/stores/authStore.ts:
- Zustand store for auth state
- user: User | null
- isAuthenticated: boolean
- isLoading: boolean
- login(): Redirect to /api/v1/auth/google
- logout(): Call logout endpoint, clear state
- checkAuth(): Verify current session

src/hooks/useAuth.ts:
- Hook that uses authStore
- Return user, isAuthenticated, login, logout

src/components/auth/ProtectedRoute.tsx:
- Check if authenticated
- Redirect to /login if not
- Show loading while checking

src/pages/Login.tsx:
- "Login with Google" button that calls login()
- Redirect if already authenticated

src/pages/AuthCallback.tsx:
- Handle OAuth callback redirect
- Extract tokens from URL/cookies
- Update auth store
- Redirect to dashboard

Update App.tsx routes and protect /dashboard
---
```

[... Continuing with more tasks for P1.2 through P1.10 and beyond ...]

---

## Task Checklist Template

Use this checklist to track progress:

```
PHASE 0: Project Setup
├── P0.1 Repository Setup
│   ├── [ ] P0.1.1 Initialize Monorepo
│   ├── [ ] P0.1.2 TypeScript Configuration
│   └── [ ] P0.1.3 ESLint and Prettier
├── P0.2 Backend Skeleton
│   ├── [ ] P0.2.1 Express Server Setup
│   └── [ ] P0.2.2 API Route Structure
├── P0.3 Database Setup
│   ├── [ ] P0.3.1 Docker Compose
│   ├── [ ] P0.3.2 Prisma Setup
│   └── [ ] P0.3.3 Database Connection
├── P0.4 Frontend Skeleton
│   ├── [ ] P0.4.1 Vite React Setup
│   ├── [ ] P0.4.2 TailwindCSS Setup
│   └── [ ] P0.4.3 React Router Setup
├── P0.5 Code Executor Setup
│   ├── [ ] P0.5.1 FastAPI Service
│   └── [ ] P0.5.2 Sandbox Dockerfiles
└── P0.6 Integration
    ├── [ ] P0.6.1 Development Scripts
    └── [ ] P0.6.2 API Client for Frontend

PHASE 1: MVP
├── P1.1 Authentication
│   ├── [ ] P1.1.1 Google OAuth Backend
│   ├── [ ] P1.1.2 Auth Middleware
│   └── [ ] P1.1.3 Frontend Auth Flow
├── P1.2 User Profile
│   ├── [ ] P1.2.1 Profile Schema & API
│   └── [ ] P1.2.2 Profile Frontend
├── P1.3 Question Bank
│   ├── [ ] P1.3.1 Question Schema
│   └── [ ] P1.3.2 Seed Questions
[... continue for all tasks ...]
```

---

## Tips for Working with Claude Code

1. **One task at a time**: Give Claude Code exactly one task from this list
2. **Provide context**: Mention what phase you're in and what's already done
3. **Test immediately**: After each task, run the test before moving on
4. **Commit often**: Commit after each successful task
5. **Reference files**: Tell Claude Code which existing files are relevant
6. **Be specific**: Copy the exact prompt from this document

### Example Claude Code Session

```
You: I'm working on an AI Mock Interviewer project. I've completed Phase 0.1 
(repo setup) and Phase 0.2.1 (Express server). Now I need to do P0.2.2 
(API Route Structure).

Current files:
- apps/api/src/index.ts
- apps/api/src/app.ts
- apps/api/src/config/env.ts

Task: [paste P0.2.2 prompt]

Claude Code: [implements the task]

You: [test it, if it works, commit and move to next task]
```
