# Claude Code Task Breakdown

## Platform: Windows

All tasks designed for **Windows** development with Git Bash, Docker Desktop, VS Code.

## How to Use This Document

Each task has:
- **TASK ID**: Unique identifier (Phase.Section.Task)
- **DESCRIPTION**: What needs to be done
- **FILES**: Files to create/modify
- **DEPENDENCIES**: Tasks that must be done first
- **TEST**: How to verify it works
- **PROMPT**: Exact prompt to give Claude Code

### Workflow with Beads

```bash
# Before starting a task
bd create "P0.1.1: Initialize Monorepo" -p 1
bd update <id> --status in_progress

# After completing a task
bd close <id> --reason "Completed - all tests pass"
```

---

# PHASE 0: Project Setup

## P0.1: Repository Setup

### P0.1.1: Initialize Monorepo

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
- name: "ai-mock-interviewer"
- private: true
- Scripts: dev, build, lint, test, docker:up, docker:down
- devDependencies: typescript, eslint, prettier, concurrently

Create pnpm-workspace.yaml pointing to apps/* and packages/*

Create comprehensive .gitignore for Node.js + Python + IDEs + env files

Create .nvmrc with "18"

Create README.md with project title and tech stack overview
---
```

### P0.1.2: TypeScript Configuration

```
TASK ID: P0.1.2
DESCRIPTION: Setup TypeScript base config and extend in packages
FILES TO CREATE:
  - tsconfig.base.json
  - apps/api/tsconfig.json
  - apps/web/tsconfig.json
  - packages/shared/tsconfig.json
  - packages/shared/package.json
  - packages/shared/src/index.ts
DEPENDENCIES: P0.1.1
TEST: Running `pnpm exec tsc --noEmit` in any app shows no errors

PROMPT FOR CLAUDE CODE:
---
Setup TypeScript configuration for the monorepo.

tsconfig.base.json (root):
- target: ES2022
- module: NodeNext
- moduleResolution: NodeNext
- strict: true
- esModuleInterop: true
- skipLibCheck: true
- forceConsistentCasingInFileNames: true
- resolveJsonModule: true
- declaration: true
- declarationMap: true

apps/api/tsconfig.json:
- Extends base config
- outDir: ./dist
- rootDir: ./src
- Include src/**/*

apps/web/tsconfig.json:
- Extends base config
- For React/Vite (jsx: react-jsx, lib: [DOM, ES2022])
- Include src/**/*

packages/shared:
- package.json with name "@ai-interviewer/shared"
- tsconfig.json extending base
- src/index.ts exporting placeholder types
---
```

### P0.1.3: ESLint and Prettier

```
TASK ID: P0.1.3
DESCRIPTION: Configure ESLint and Prettier for code quality
FILES TO CREATE:
  - .eslintrc.js
  - .prettierrc
  - .prettierignore
  - apps/api/.eslintrc.js
  - apps/web/.eslintrc.js
DEPENDENCIES: P0.1.2
TEST: Running `pnpm lint` passes with no errors

PROMPT FOR CLAUDE CODE:
---
Setup ESLint and Prettier for the monorepo.

Root .eslintrc.js:
- Parser: @typescript-eslint/parser
- Plugins: @typescript-eslint
- Extends: eslint:recommended, plugin:@typescript-eslint/recommended
- Rules: no-unused-vars (warn), no-console (warn)

apps/api/.eslintrc.js:
- Extends root config
- Node environment
- Rules appropriate for backend

apps/web/.eslintrc.js:
- Extends root config
- Adds: plugin:react/recommended, plugin:react-hooks/recommended
- Browser environment
- React version: detect

.prettierrc:
- semi: true
- singleQuote: true
- tabWidth: 2
- trailingComma: es5
- printWidth: 100

.prettierignore:
- node_modules, dist, build, .next, coverage

Add devDependencies to root:
- eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
- eslint-plugin-react, eslint-plugin-react-hooks
- prettier, eslint-config-prettier

Add scripts: "lint": "eslint . --ext .ts,.tsx", "format": "prettier --write ."
---
```

---

## P0.2: Backend Skeleton

### P0.2.1: Express Server Setup

```
TASK ID: P0.2.1
DESCRIPTION: Create basic Express server with TypeScript
FILES TO CREATE:
  - apps/api/package.json
  - apps/api/src/index.ts
  - apps/api/src/app.ts
  - apps/api/src/config/env.ts
DEPENDENCIES: P0.1.3
TEST: Running `pnpm --filter api dev` starts server, GET /health returns 200

PROMPT FOR CLAUDE CODE:
---
Create Express.js backend in apps/api.

package.json:
- name: "@ai-interviewer/api"
- dependencies: express, cors, helmet, morgan, dotenv, zod
- devDependencies: @types/express, @types/cors, @types/morgan, tsx, nodemon
- scripts: dev (nodemon with tsx), build, start

src/config/env.ts:
- Use zod to validate environment variables
- PORT (default 3000), NODE_ENV, DATABASE_URL, REDIS_URL
- Export validated config object

src/app.ts:
- Create Express app
- Add middleware: cors, helmet, morgan, express.json
- Add error handling middleware

src/index.ts:
- Import app
- Start server on configured port
- Log startup message

Add GET /health route returning { status: "ok", timestamp: Date.now() }
---
```

### P0.2.2: API Route Structure

```
TASK ID: P0.2.2
DESCRIPTION: Create organized route structure
FILES TO CREATE:
  - apps/api/src/routes/index.ts
  - apps/api/src/routes/auth.routes.ts
  - apps/api/src/routes/users.routes.ts
  - apps/api/src/routes/interviews.routes.ts
  - apps/api/src/middleware/errorHandler.ts
  - apps/api/src/utils/ApiError.ts
DEPENDENCIES: P0.2.1
TEST: All routes return placeholder responses

PROMPT FOR CLAUDE CODE:
---
Create organized API route structure in apps/api.

src/utils/ApiError.ts:
- Custom error class extending Error
- Properties: statusCode, message, isOperational
- Static methods: badRequest, unauthorized, forbidden, notFound, internal

src/middleware/errorHandler.ts:
- Express error handler middleware
- Handle ApiError instances specially
- Log errors in development
- Return consistent error response shape

src/routes/index.ts:
- Main router combining all route modules
- Mount routes at: /auth, /users, /interviews

src/routes/auth.routes.ts:
- POST /login (placeholder)
- POST /logout (placeholder)
- GET /me (placeholder)

src/routes/users.routes.ts:
- GET /:id (placeholder)
- PUT /:id (placeholder)

src/routes/interviews.routes.ts:
- GET / (list)
- POST / (create)
- GET /:id (single)
- PUT /:id (update)
- DELETE /:id (delete)

All routes should return: { success: true, data: "placeholder" }

Update app.ts to use routes at /api/v1
---
```

---

## P0.3: Database Setup

### P0.3.1: Docker Compose

```
TASK ID: P0.3.1
DESCRIPTION: Create Docker Compose for PostgreSQL and Redis
FILES TO CREATE:
  - docker/docker-compose.yml
  - docker/docker-compose.dev.yml
  - docker/.env.example
DEPENDENCIES: P0.2.2
TEST: `pnpm docker:up` starts containers, can connect to PostgreSQL

PROMPT FOR CLAUDE CODE:
---
Create Docker Compose configuration for development databases.

docker/docker-compose.yml:
- PostgreSQL 15:
  - Container name: ai-interviewer-db
  - Port: 5432:5432
  - Volume for data persistence
  - Environment: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
- Redis 7:
  - Container name: ai-interviewer-redis
  - Port: 6379:6379
  - Volume for data persistence

docker/docker-compose.dev.yml:
- Extends base config
- Uses local .env file
- Adds healthchecks

docker/.env.example:
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
- POSTGRES_DB=ai_interviewer_dev

Update root package.json scripts:
- docker:up: "docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d"
- docker:down: "docker compose -f docker/docker-compose.yml down"
- docker:logs: "docker compose -f docker/docker-compose.yml logs -f"
---
```

### P0.3.2: Prisma Setup

```
TASK ID: P0.3.2
DESCRIPTION: Initialize Prisma with schema
FILES TO CREATE:
  - apps/api/prisma/schema.prisma
  - apps/api/src/lib/prisma.ts
DEPENDENCIES: P0.3.1
TEST: `pnpm --filter api db:generate` creates client

PROMPT FOR CLAUDE CODE:
---
Setup Prisma ORM in apps/api.

Add dependencies: prisma (dev), @prisma/client

prisma/schema.prisma:
- datasource: postgresql
- generator: prisma-client-js

Initial models:
- User: id (uuid), email (unique), name, googleId (unique), avatarUrl, createdAt, updatedAt
- UserProfile: id, userId (relation), experienceYears, targetRole, skills (String[])

src/lib/prisma.ts:
- Export singleton Prisma client
- Handle connection in development (prevent multiple clients)

Add scripts to api package.json:
- db:generate: "prisma generate"
- db:migrate: "prisma migrate dev"
- db:push: "prisma db push"
- db:studio: "prisma studio"
- db:seed: "prisma db seed"
---
```

### P0.3.3: Complete Database Schema

```
TASK ID: P0.3.3
DESCRIPTION: Add all database models from data model doc
FILES TO MODIFY:
  - apps/api/prisma/schema.prisma
DEPENDENCIES: P0.3.2
TEST: `pnpm --filter api db:migrate` succeeds

PROMPT FOR CLAUDE CODE:
---
Add complete database schema to apps/api/prisma/schema.prisma based on docs/03_DATA_MODEL.md.

Enums:
- InterviewType: DSA, SYSTEM_DESIGN
- InterviewStatus: IN_PROGRESS, PAUSED, COMPLETED, ABANDONED
- Difficulty: EASY, MEDIUM, HARD
- QuestionFormat: OPEN_ENDED, MCQ, SCENARIO
- MessageRole: USER, AI, SYSTEM

Models needed:

User:
- id, email, name, googleId, avatarUrl, createdAt, updatedAt
- Relations: profile, interviews, dailyStats

UserProfile:
- id, userId (unique), experienceYears, targetRole, targetCompany
- preferredLanguage, skills[], weakTopics[], strongTopics[]
- resumeUrl, resumeParsed (Json)

Interview:
- id, oderId, type, status, difficulty
- startedAt, pausedAt, completedAt, totalDuration
- Relations: rounds, feedback

Round:
- id, interviewId, roundNumber, questionId
- startedAt, completedAt, score, aiNotes
- Relations: messages, submissions

Question:
- id, type, difficulty, title, description (markdown), format
- hints[], topic, tags[]
- Relations: testCases, options

QuestionTestCase:
- id, questionId, input, expectedOutput, isHidden

QuestionOption (for MCQ):
- id, questionId, text, isCorrect, explanation

Message:
- id, roundId, role, content, createdAt

CodeSubmission:
- id, roundId, language, code, isSubmission
- testResults (Json), executionTime, createdAt

InterviewFeedback:
- id, interviewId, overallScore, technicalScore
- communicationScore, summary, strengths[], improvements[]

UserDailyStats:
- id, oderId, date, interviewsCompleted, questionsAttempted, totalTime

Add proper indexes and cascade deletes.
---
```

---

## P0.4: Frontend Skeleton

### P0.4.1: Vite React Setup

```
TASK ID: P0.4.1
DESCRIPTION: Create React app with Vite
FILES TO CREATE:
  - apps/web/package.json
  - apps/web/vite.config.ts
  - apps/web/index.html
  - apps/web/src/main.tsx
  - apps/web/src/App.tsx
  - apps/web/src/vite-env.d.ts
DEPENDENCIES: P0.1.3
TEST: `pnpm --filter web dev` starts dev server at localhost:5173

PROMPT FOR CLAUDE CODE:
---
Create React frontend with Vite in apps/web.

package.json:
- name: "@ai-interviewer/web"
- dependencies: react, react-dom
- devDependencies: @types/react, @types/react-dom, vite, @vitejs/plugin-react
- scripts: dev, build, preview

vite.config.ts:
- React plugin
- Server port: 5173
- Proxy /api to http://localhost:3000

index.html:
- Standard HTML5 template
- Root div
- Script module pointing to /src/main.tsx

src/main.tsx:
- React 18 createRoot
- Render App component

src/App.tsx:
- Simple component with "AI Mock Interviewer" heading

src/vite-env.d.ts:
- Vite client types reference
---
```

### P0.4.2: TailwindCSS Setup

```
TASK ID: P0.4.2
DESCRIPTION: Configure TailwindCSS
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
- Content paths: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
- Extend theme with primary (blue) and secondary (gray) colors
- Add Inter font family

postcss.config.js:
- TailwindCSS and autoprefixer plugins

src/index.css:
- @tailwind base, components, utilities directives
- Import Inter font from Google Fonts
- Base styles for body

Update main.tsx to import index.css
Update App.tsx to use Tailwind classes
---
```

### P0.4.3: React Router Setup

```
TASK ID: P0.4.3
DESCRIPTION: Add React Router with page structure
FILES TO CREATE:
  - apps/web/src/pages/Home.tsx
  - apps/web/src/pages/Login.tsx
  - apps/web/src/pages/Dashboard.tsx
  - apps/web/src/pages/NotFound.tsx
  - apps/web/src/components/layout/Layout.tsx
  - apps/web/src/components/layout/Header.tsx
  - apps/web/src/components/layout/Footer.tsx
DEPENDENCIES: P0.4.2
TEST: Can navigate between pages, URLs update correctly

PROMPT FOR CLAUDE CODE:
---
Setup React Router in apps/web.

Add dependency: react-router-dom

src/components/layout/Header.tsx:
- Logo/title linking to home
- Navigation links

src/components/layout/Footer.tsx:
- Copyright text

src/components/layout/Layout.tsx:
- Header, main content (children), Footer
- Min-height screen

src/pages/Home.tsx:
- Hero section with title
- "Get Started" button linking to /login
- Features preview

src/pages/Login.tsx:
- Centered card
- "Login with Google" button (non-functional for now)

src/pages/Dashboard.tsx:
- Welcome message placeholder

src/pages/NotFound.tsx:
- 404 message with link to home

Update App.tsx:
- BrowserRouter wrapper
- Routes: /, /login, /dashboard, * (404)
- Wrap with Layout
---
```

---

## P0.5: Code Executor Setup

### P0.5.1: FastAPI Service

```
TASK ID: P0.5.1
DESCRIPTION: Create Python FastAPI service
FILES TO CREATE:
  - apps/code-executor/requirements.txt
  - apps/code-executor/src/main.py
  - apps/code-executor/src/schemas.py
  - apps/code-executor/src/executor.py
  - apps/code-executor/Dockerfile
DEPENDENCIES: P0.3.1
TEST: GET /health returns ok, POST /execute returns mock result

PROMPT FOR CLAUDE CODE:
---
Create Python FastAPI service in apps/code-executor.

requirements.txt:
- fastapi==0.104.1
- uvicorn[standard]==0.24.0
- docker==6.1.3
- pydantic==2.5.2

src/schemas.py:
- ExecuteRequest: language, code, stdin (optional), timeout (default 10)
- ExecuteResponse: success, stdout, stderr, execution_time_ms, error

src/executor.py:
- DockerExecutor class (mock for now)
- execute method returning mock response

src/main.py:
- FastAPI app with CORS
- GET /health returns {"status": "ok"}
- POST /execute accepts ExecuteRequest, returns ExecuteResponse

Dockerfile:
- FROM python:3.11-slim
- WORKDIR /app
- Install requirements
- CMD uvicorn
---
```

### P0.5.2: Sandbox Docker Images

```
TASK ID: P0.5.2
DESCRIPTION: Create sandbox Docker images for code execution
FILES TO CREATE:
  - apps/code-executor/sandboxes/python/Dockerfile
  - apps/code-executor/sandboxes/javascript/Dockerfile
  - apps/code-executor/sandboxes/java/Dockerfile
  - apps/code-executor/src/executor.py (update)
DEPENDENCIES: P0.5.1
TEST: Can execute simple code in each language

PROMPT FOR CLAUDE CODE:
---
Create sandbox Docker images for secure code execution.

sandboxes/python/Dockerfile:
- FROM python:3.11-slim
- Non-root user 'sandbox'
- WORKDIR /sandbox

sandboxes/javascript/Dockerfile:
- FROM node:18-slim
- Non-root user
- WORKDIR /sandbox

sandboxes/java/Dockerfile:
- FROM openjdk:17-slim
- Non-root user
- WORKDIR /sandbox

Update src/executor.py:
- Actually execute code in Docker containers
- Set limits: memory 256MB, cpu 0.5, no network
- Timeout handling
- Capture stdout/stderr
- Return ExecuteResponse

Add code-executor service to docker-compose.yml
---
```

---

## P0.6: Integration

### P0.6.1: Development Scripts

```
TASK ID: P0.6.1
DESCRIPTION: Create unified development scripts
FILES TO MODIFY:
  - package.json
  - .env.example
DEPENDENCIES: P0.5.2
TEST: `pnpm dev` starts all services

PROMPT FOR CLAUDE CODE:
---
Create development scripts for the monorepo.

Update root package.json scripts:
- dev: "concurrently -n api,web -c blue,green \"pnpm dev:api\" \"pnpm dev:web\""
- dev:api: "pnpm --filter @ai-interviewer/api dev"
- dev:web: "pnpm --filter @ai-interviewer/web dev"
- dev:executor: "cd apps/code-executor && uvicorn src.main:app --reload --port 8000"
- build: Build all packages
- lint: Run ESLint
- typecheck: Run TypeScript check
- test: Run tests
- db:migrate, db:seed, db:studio

Create .env.example at root with all required variables:
- DATABASE_URL
- REDIS_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GROQ_API_KEY
- JWT_SECRET
- JWT_REFRESH_SECRET
---
```

### P0.6.2: API Client for Frontend

```
TASK ID: P0.6.2
DESCRIPTION: Create typed API client
FILES TO CREATE:
  - apps/web/src/services/api.ts
  - apps/web/src/services/auth.api.ts
  - apps/web/src/services/interviews.api.ts
  - packages/shared/src/types/api.ts
DEPENDENCIES: P0.6.1
TEST: API client can make requests to backend

PROMPT FOR CLAUDE CODE:
---
Create typed API client for frontend.

packages/shared/src/types/api.ts:
- ApiResponse<T> type
- User, Interview, Question types
- Export all

apps/web/src/services/api.ts:
- Axios instance with baseURL /api/v1
- Request interceptor for auth token
- Response interceptor for errors
- Typed methods: get<T>, post<T>, put<T>, delete<T>

apps/web/src/services/auth.api.ts:
- login, logout, getMe, refresh

apps/web/src/services/interviews.api.ts:
- list, get, create, update

Add axios dependency to web package
---
```

---

# PHASE 1: MVP Features

## P1.1: Authentication

### P1.1.1: Google OAuth Backend

```
TASK ID: P1.1.1
DESCRIPTION: Implement Google OAuth with Passport.js
FILES TO CREATE:
  - apps/api/src/config/passport.ts
  - apps/api/src/services/auth.service.ts
  - apps/api/src/controllers/auth.controller.ts
  - apps/api/src/routes/auth.routes.ts (update)
DEPENDENCIES: P0.3.3
TEST: GET /api/v1/auth/google redirects to Google

PROMPT FOR CLAUDE CODE:
---
Implement Google OAuth authentication in apps/api.

Add dependencies: passport, passport-google-oauth20, jsonwebtoken, cookie-parser

src/config/passport.ts:
- Configure Google OAuth strategy
- Callback URL: /api/v1/auth/google/callback
- Verify callback: Find or create user

src/services/auth.service.ts:
- findOrCreateUser(googleProfile)
- generateTokens(userId): access (15min) + refresh (7d) tokens
- verifyAccessToken, verifyRefreshToken

src/controllers/auth.controller.ts:
- googleAuth: Initiate OAuth
- googleCallback: Handle callback, set cookies
- logout: Clear cookies
- refresh: New access token

src/routes/auth.routes.ts:
- GET /google: Start OAuth
- GET /google/callback: Handle callback
- POST /logout
- POST /refresh
- GET /me: Current user

Update app.ts with passport and cookie-parser middleware
---
```

### P1.1.2: Auth Middleware

```
TASK ID: P1.1.2
DESCRIPTION: Create authentication middleware
FILES TO CREATE:
  - apps/api/src/middleware/auth.middleware.ts
  - apps/api/src/types/express.d.ts
DEPENDENCIES: P1.1.1
TEST: Protected routes return 401 without token

PROMPT FOR CLAUDE CODE:
---
Create authentication middleware in apps/api.

src/types/express.d.ts:
- Extend Express Request with user property

src/middleware/auth.middleware.ts:
- authenticate: Extract token, verify, attach user
- optionalAuth: Same but don't error if missing

Create test route GET /api/v1/users/me that requires auth
---
```

### P1.1.3: Frontend Auth Flow

```
TASK ID: P1.1.3
DESCRIPTION: Implement auth flow in frontend
FILES TO CREATE:
  - apps/web/src/stores/authStore.ts
  - apps/web/src/hooks/useAuth.ts
  - apps/web/src/components/auth/ProtectedRoute.tsx
  - apps/web/src/pages/AuthCallback.tsx
DEPENDENCIES: P1.1.2
TEST: Can login with Google and access dashboard

PROMPT FOR CLAUDE CODE:
---
Implement frontend authentication in apps/web.

Add dependency: zustand

src/stores/authStore.ts:
- Zustand store: user, isAuthenticated, isLoading
- Actions: login (redirect), logout, checkAuth

src/hooks/useAuth.ts:
- Hook using authStore

src/components/auth/ProtectedRoute.tsx:
- Check auth, redirect to /login if not

src/pages/AuthCallback.tsx:
- Handle OAuth callback
- Call checkAuth, redirect to dashboard

Update Login.tsx to use login()
Update App.tsx with /auth/callback route and ProtectedRoute
---
```

---

## P1.2: User Profile

### P1.2.1: Profile API

```
TASK ID: P1.2.1
DESCRIPTION: Create user profile endpoints
FILES TO CREATE:
  - apps/api/src/services/user.service.ts
  - apps/api/src/controllers/user.controller.ts
  - apps/api/src/validators/user.validator.ts
DEPENDENCIES: P1.1.2
TEST: Can get and update user profile

PROMPT FOR CLAUDE CODE:
---
Create user profile management API.

src/validators/user.validator.ts (Zod):
- updateProfileSchema with all profile fields

src/services/user.service.ts:
- getUser, updateUser, getProfile, updateProfile

src/controllers/user.controller.ts:
- getMe, updateMe, getProfile, updateProfile

Update routes with authenticated endpoints
---
```

### P1.2.2: Profile Frontend

```
TASK ID: P1.2.2
DESCRIPTION: Create profile page and components
FILES TO CREATE:
  - apps/web/src/pages/Profile.tsx
  - apps/web/src/components/profile/ProfileForm.tsx
  - apps/web/src/components/ui/Input.tsx
  - apps/web/src/components/ui/Select.tsx
  - apps/web/src/components/ui/Button.tsx
DEPENDENCIES: P1.2.1
TEST: Can view and edit profile

PROMPT FOR CLAUDE CODE:
---
Create profile page and UI components.

src/components/ui/Button.tsx:
- Variants: primary, secondary, outline
- Loading state

src/components/ui/Input.tsx:
- Label, error message support

src/components/ui/Select.tsx:
- Label, options

src/components/profile/ProfileForm.tsx:
- Form for all profile fields
- Submit to API

src/pages/Profile.tsx:
- Fetch and display profile
- Loading state

Add /profile route (protected)
---
```

---

## P1.3: Question Bank

### P1.3.1: Question API

```
TASK ID: P1.3.1
DESCRIPTION: Create question management
FILES TO CREATE:
  - apps/api/src/services/question.service.ts
  - apps/api/src/controllers/question.controller.ts
  - apps/api/src/routes/questions.routes.ts
DEPENDENCIES: P0.3.3
TEST: Can list and get questions

PROMPT FOR CLAUDE CODE:
---
Create question management API.

src/services/question.service.ts:
- listQuestions(filters): With pagination, filter by type/difficulty
- getQuestion(id): With test cases
- getRandomQuestion(type, difficulty, excludeIds)

src/controllers/question.controller.ts:
- list, getOne

src/routes/questions.routes.ts:
- GET /: list
- GET /:id: single
---
```

### P1.3.2: Seed Questions

```
TASK ID: P1.3.2
DESCRIPTION: Create seed data for DSA questions
FILES TO CREATE:
  - apps/api/prisma/seed.ts
  - apps/api/prisma/data/dsa-questions.json
DEPENDENCIES: P1.3.1
TEST: `pnpm db:seed` populates 20 questions

PROMPT FOR CLAUDE CODE:
---
Create seed data for DSA questions.

prisma/data/dsa-questions.json:
Create 20 DSA questions:
- Easy (7): Two Sum, Valid Parentheses, Merge Sorted Lists, etc.
- Medium (8): Add Two Numbers, Longest Substring, 3Sum, etc.
- Hard (5): Median of Arrays, Merge K Lists, Trapping Rain Water, etc.

Each with: title, description (markdown), difficulty, topic, hints[], testCases[]

prisma/seed.ts:
- Read JSON, upsert questions with test cases
---
```

---

## P1.4: DSA Interview Core

### P1.4.1: Interview Service

```
TASK ID: P1.4.1
DESCRIPTION: Create interview management service
FILES TO CREATE:
  - apps/api/src/services/interview.service.ts
  - apps/api/src/controllers/interview.controller.ts
  - apps/api/src/validators/interview.validator.ts
DEPENDENCIES: P1.3.2
TEST: Can create and retrieve interviews

PROMPT FOR CLAUDE CODE:
---
Create interview management service.

src/services/interview.service.ts:
- createInterview(userId, type, difficulty): Check no active, create with first round
- getInterview(id, userId): With all relations
- getUserInterviews(userId): List with stats
- getActiveInterview(userId): Find in progress/paused

src/controllers/interview.controller.ts:
- create, list, getOne, getActive

Update routes
---
```

### P1.4.2: WebSocket Setup

```
TASK ID: P1.4.2
DESCRIPTION: Setup Socket.io for real-time
FILES TO CREATE:
  - apps/api/src/websocket/index.ts
  - apps/api/src/websocket/handlers/interview.handler.ts
  - apps/api/src/websocket/middleware/auth.ws.ts
DEPENDENCIES: P1.4.1
TEST: Can connect with auth token

PROMPT FOR CLAUDE CODE:
---
Setup Socket.io for real-time interview communication.

Add dependency: socket.io

src/websocket/middleware/auth.ws.ts:
- Authenticate socket connections

src/websocket/handlers/interview.handler.ts:
- joinInterview, leaveInterview, sendMessage, submitCode

src/websocket/index.ts:
- Create Socket.io server
- Apply auth middleware
- Register handlers

Update src/index.ts to attach WebSocket server
---
```

### P1.4.3: Interview Frontend

```
TASK ID: P1.4.3
DESCRIPTION: Create interview page with chat
FILES TO CREATE:
  - apps/web/src/pages/Interview.tsx
  - apps/web/src/components/interview/ChatPanel.tsx
  - apps/web/src/components/interview/MessageList.tsx
  - apps/web/src/components/interview/MessageInput.tsx
  - apps/web/src/stores/interviewStore.ts
  - apps/web/src/hooks/useSocket.ts
DEPENDENCIES: P1.4.2
TEST: Can join interview and see chat

PROMPT FOR CLAUDE CODE:
---
Create interview page with chat.

Add dependency: socket.io-client

src/hooks/useSocket.ts:
- Manage socket connection

src/stores/interviewStore.ts:
- interview, messages, currentRound state

src/components/interview/MessageList.tsx:
- Display messages with different styles for USER/AI

src/components/interview/MessageInput.tsx:
- Text input, send button

src/components/interview/ChatPanel.tsx:
- MessageList + MessageInput

src/pages/Interview.tsx:
- Connect socket, join room, display ChatPanel

Add /interview/:id route
---
```

---

## P1.5: Code Editor

### P1.5.1: Monaco Editor

```
TASK ID: P1.5.1
DESCRIPTION: Add Monaco code editor
FILES TO CREATE:
  - apps/web/src/components/editor/CodeEditor.tsx
  - apps/web/src/components/editor/LanguageSelector.tsx
  - apps/web/src/components/editor/EditorToolbar.tsx
DEPENDENCIES: P1.4.3
TEST: Can type code with syntax highlighting

PROMPT FOR CLAUDE CODE:
---
Create Monaco code editor components.

Add dependency: @monaco-editor/react

src/components/editor/LanguageSelector.tsx:
- Dropdown: javascript, python, java

src/components/editor/EditorToolbar.tsx:
- Language selector, Run, Submit buttons

src/components/editor/CodeEditor.tsx:
- Monaco wrapper with dark theme
- Language-specific starter templates

Update Interview.tsx with split layout: Chat (40%) | Editor (60%)
---
```

### P1.5.2: Code Execution

```
TASK ID: P1.5.2
DESCRIPTION: Integrate code execution
FILES TO CREATE:
  - apps/web/src/components/editor/TestResults.tsx
  - apps/web/src/components/editor/OutputPanel.tsx
  - apps/api/src/services/codeExecution.service.ts
DEPENDENCIES: P1.5.1
TEST: Can run code and see results

PROMPT FOR CLAUDE CODE:
---
Integrate code execution.

apps/api/src/services/codeExecution.service.ts:
- executeCode(language, code, stdin): Call code-executor
- runTests(language, code, testCases): Run all tests

Add WebSocket handlers: interview:run, interview:submit

apps/web/src/components/editor/OutputPanel.tsx:
- Tab interface: Output | Test Results

apps/web/src/components/editor/TestResults.tsx:
- Pass/fail for each test

Update Interview.tsx with OutputPanel
---
```

---

## P1.6: AI Integration

### P1.6.1: Groq Client

```
TASK ID: P1.6.1
DESCRIPTION: Create Groq API client
FILES TO CREATE:
  - apps/api/src/lib/groq.ts
  - apps/api/src/services/ai/aiClient.ts
  - apps/api/src/services/ai/prompts.ts
DEPENDENCIES: P0.2.2
TEST: Can generate AI response

PROMPT FOR CLAUDE CODE:
---
Create Groq API integration.

Add dependency: groq-sdk

src/lib/groq.ts:
- Initialize Groq client

src/services/ai/prompts.ts:
- DSA_INTERVIEWER_SYSTEM prompt
- Helper functions for question/hint/feedback prompts

src/services/ai/aiClient.ts:
- generateResponse(system, messages, options)
- Handle rate limits
---
```

### P1.6.2: Interview AI

```
TASK ID: P1.6.2
DESCRIPTION: Create AI interviewer service
FILES TO CREATE:
  - apps/api/src/services/ai/dsaInterviewer.service.ts
  - apps/api/src/services/message.service.ts
DEPENDENCIES: P1.6.1
TEST: AI responds to interview messages

PROMPT FOR CLAUDE CODE:
---
Create AI interviewer service.

src/services/message.service.ts:
- createMessage, getMessages, formatForAI

src/services/ai/dsaInterviewer.service.ts:
- DSAInterviewer class
- generateIntroduction(): Welcome + question
- handleUserMessage(message): Generate AI response
- generateHint(level)
- evaluateCode(code, results)

Update WebSocket interview:message handler to use AI
---
```

---

## P1.7: Dashboard

### P1.7.1: Dashboard API

```
TASK ID: P1.7.1
DESCRIPTION: Create dashboard endpoints
FILES TO CREATE:
  - apps/api/src/services/analytics.service.ts
  - apps/api/src/controllers/dashboard.controller.ts
  - apps/api/src/routes/dashboard.routes.ts
DEPENDENCIES: P1.4.1
TEST: Dashboard returns stats

PROMPT FOR CLAUDE CODE:
---
Create dashboard API.

src/services/analytics.service.ts:
- getUserStats(userId): Total, completed, avg score
- getRecentInterviews(userId, limit)
- getStreak(userId)

src/controllers/dashboard.controller.ts:
- getStats, getRecent, getStreak

src/routes/dashboard.routes.ts:
- GET /stats, /recent, /streak
---
```

### P1.7.2: Dashboard Frontend

```
TASK ID: P1.7.2
DESCRIPTION: Create dashboard UI
FILES TO CREATE:
  - apps/web/src/components/dashboard/StatsCard.tsx
  - apps/web/src/components/dashboard/RecentInterviews.tsx
  - apps/web/src/components/dashboard/StreakDisplay.tsx
  - apps/web/src/components/dashboard/StartInterviewCard.tsx
DEPENDENCIES: P1.7.1
TEST: Dashboard shows stats and recent interviews

PROMPT FOR CLAUDE CODE:
---
Create dashboard UI.

src/components/dashboard/StatsCard.tsx:
- Single stat with icon and value

src/components/dashboard/StreakDisplay.tsx:
- Current streak, last 7 days

src/components/dashboard/RecentInterviews.tsx:
- List of recent interviews

src/components/dashboard/StartInterviewCard.tsx:
- Select type, difficulty, start button

Update Dashboard.tsx with all components
---
```

---

## P1.8: Feedback

### P1.8.1: Feedback Generation

```
TASK ID: P1.8.1
DESCRIPTION: Generate interview feedback
FILES TO CREATE:
  - apps/api/src/services/ai/feedbackGenerator.service.ts
  - apps/api/src/services/feedback.service.ts
DEPENDENCIES: P1.6.2
TEST: Feedback generated on completion

PROMPT FOR CLAUDE CODE:
---
Create feedback generation.

src/services/ai/feedbackGenerator.service.ts:
- generateInterviewFeedback(interview): AI-generated summary

src/services/feedback.service.ts:
- createFeedback(interviewId, data): Calculate scores, save
- getFeedback(interviewId)
---
```

### P1.8.2: Feedback Frontend

```
TASK ID: P1.8.2
DESCRIPTION: Create feedback page
FILES TO CREATE:
  - apps/web/src/pages/InterviewFeedback.tsx
  - apps/web/src/components/feedback/ScoreCard.tsx
  - apps/web/src/components/feedback/FeedbackSection.tsx
DEPENDENCIES: P1.8.1
TEST: Can view feedback after interview

PROMPT FOR CLAUDE CODE:
---
Create feedback page.

src/components/feedback/ScoreCard.tsx:
- Circular progress, score out of 100

src/components/feedback/FeedbackSection.tsx:
- Section with title and content

src/pages/InterviewFeedback.tsx:
- Fetch and display feedback
- Scores, summary, strengths, improvements

Add /interview/:id/feedback route
---
```

---

# PHASE 2: Core Features

## P2.1: System Design

### P2.1.1: System Design AI

```
TASK ID: P2.1.1
DESCRIPTION: Create System Design interview AI
FILES TO CREATE:
  - apps/api/src/services/ai/systemDesignInterviewer.service.ts
  - apps/api/src/services/ai/prompts/systemDesign.prompts.ts
DEPENDENCIES: P1.6.2
TEST: AI conducts SD interview phases

PROMPT FOR CLAUDE CODE:
---
Create System Design AI based on Alex Xu guidelines.

src/services/ai/prompts/systemDesign.prompts.ts:
- System prompt, phase prompts (requirements, high-level, deep-dive, scale)

src/services/ai/systemDesignInterviewer.service.ts:
- Manage phases, generate responses, MCQs, evaluate
---
```

### P2.1.2: SD Questions

```
TASK ID: P2.1.2
DESCRIPTION: Add System Design questions
FILES TO CREATE:
  - apps/api/prisma/data/system-design-questions.json
DEPENDENCIES: P2.1.1
TEST: SD questions seeded

PROMPT FOR CLAUDE CODE:
---
Add 10 System Design questions:
- URL Shortener, Twitter, YouTube, Uber, etc.
- Each with phase guides
---
```

### P2.1.3: SD Frontend

```
TASK ID: P2.1.3
DESCRIPTION: System Design interview UI
FILES TO CREATE:
  - apps/web/src/components/interview/PhaseIndicator.tsx
  - apps/web/src/components/interview/MCQQuestion.tsx
DEPENDENCIES: P2.1.2
TEST: Can conduct SD interview

PROMPT FOR CLAUDE CODE:
---
Create SD interview UI.

src/components/interview/PhaseIndicator.tsx:
- Shows current phase 1-4

src/components/interview/MCQQuestion.tsx:
- MCQ display with submit

Update Interview.tsx to handle SD type
---
```

---

## P2.2: Pause/Resume

### P2.2.1: Backend

```
TASK ID: P2.2.1
DESCRIPTION: Implement pause/resume
FILES TO CREATE:
  - apps/api/src/services/pauseResume.service.ts
DEPENDENCIES: P1.4.1
TEST: Can pause and resume within 24h

PROMPT FOR CLAUDE CODE:
---
Implement pause/resume.

src/services/pauseResume.service.ts:
- pauseInterview: Save state to Redis
- resumeInterview: Restore, generate recap
- expirePausedInterviews: Cron job

Add WebSocket events
---
```

### P2.2.2: Frontend

```
TASK ID: P2.2.2
DESCRIPTION: Pause/resume UI
FILES TO CREATE:
  - apps/web/src/components/interview/PauseModal.tsx
  - apps/web/src/components/interview/ResumePrompt.tsx
DEPENDENCIES: P2.2.1
TEST: Can pause and resume from UI

PROMPT FOR CLAUDE CODE:
---
Add pause/resume UI.

src/components/interview/PauseModal.tsx:
- Confirm pause with 24h warning

src/components/interview/ResumePrompt.tsx:
- Show on dashboard if paused exists

Update Interview.tsx and Dashboard.tsx
---
```

---

## P2.3: Adaptive Difficulty

### P2.3.1: Adaptive Engine

```
TASK ID: P2.3.1
DESCRIPTION: Adaptive question selection
FILES TO CREATE:
  - apps/api/src/services/adaptiveEngine.service.ts
DEPENDENCIES: P1.4.1
TEST: Difficulty adjusts based on performance

PROMPT FOR CLAUDE CODE:
---
Create adaptive engine.

src/services/adaptiveEngine.service.ts:
- getNextQuestion: Analyze performance, select appropriate
- calculatePerformance: Score 0-100
- adjustDifficulty: Up/down based on score
- selectTopic: Mix weak/strong areas
---
```

---

## P2.4: Enhanced Feedback

### P2.4.1: Detailed Scoring

```
TASK ID: P2.4.1
DESCRIPTION: Detailed scoring system
FILES TO CREATE:
  - apps/api/src/services/scoring.service.ts
DEPENDENCIES: P1.8.1
TEST: Detailed scores calculated

PROMPT FOR CLAUDE CODE:
---
Create scoring service.

src/services/scoring.service.ts:
- scoreDSARound: correctness, efficiency, quality, communication
- calculateOverallScore
---
```

### P2.4.2: Feedback UI Improvements

```
TASK ID: P2.4.2
DESCRIPTION: Enhanced feedback UI
FILES TO CREATE:
  - apps/web/src/components/feedback/RoundBreakdown.tsx
DEPENDENCIES: P2.4.1
TEST: Per-question feedback shown

PROMPT FOR CLAUDE CODE:
---
Enhance feedback UI.

src/components/feedback/RoundBreakdown.tsx:
- Per-round details, scores, code comparison

Update InterviewFeedback.tsx with tabs
---
```

---

## P2.5: Concurrency

### P2.5.1: Single Interview Lock

```
TASK ID: P2.5.1
DESCRIPTION: One active interview per user
FILES TO CREATE:
  - apps/api/src/services/tabLock.service.ts
DEPENDENCIES: P2.2.1
TEST: Cannot start new while one active

PROMPT FOR CLAUDE CODE:
---
Implement single interview enforcement.

src/services/tabLock.service.ts:
- Redis-based locking
- acquireLock, renewLock, releaseLock

Update interview creation to check
---
```

### P2.5.2: Disconnection Handling

```
TASK ID: P2.5.2
DESCRIPTION: Handle connection loss
FILES TO CREATE:
  - apps/api/src/services/connectionRecovery.service.ts
DEPENDENCIES: P2.5.1
TEST: Recovers after brief disconnect

PROMPT FOR CLAUDE CODE:
---
Handle disconnection.

src/services/connectionRecovery.service.ts:
- onDisconnect: Start grace period
- onReconnect: Restore state
- onGracePeriodExpired: Auto-pause
---
```

---

# PHASE 3: Production

## P3.1: AWS

### P3.1.1: EC2 Setup

```
TASK ID: P3.1.1
DESCRIPTION: Configure EC2
FILES TO CREATE:
  - infrastructure/ec2-setup.sh
  - infrastructure/nginx.conf
DEPENDENCIES: P2.5.2
TEST: Can SSH and run app

PROMPT FOR CLAUDE CODE:
---
Create EC2 setup scripts.

infrastructure/ec2-setup.sh:
- Install Node.js, Docker, nginx
- Create systemd services

infrastructure/nginx.conf:
- Reverse proxy, SSL, WebSocket
---
```

### P3.1.2: Database Services

```
TASK ID: P3.1.2
DESCRIPTION: RDS & ElastiCache setup
FILES TO CREATE:
  - infrastructure/aws-setup.md
DEPENDENCIES: P3.1.1
TEST: Can connect to managed services

PROMPT FOR CLAUDE CODE:
---
Create AWS managed services guide.

infrastructure/aws-setup.md:
- RDS PostgreSQL setup (free tier)
- ElastiCache Redis setup
- Security groups, connection strings
---
```

---

## P3.2: CI/CD

### P3.2.1: GitHub Actions

```
TASK ID: P3.2.1
DESCRIPTION: CI/CD pipeline
FILES TO CREATE:
  - .github/workflows/ci.yml
  - .github/workflows/deploy.yml
DEPENDENCIES: P3.1.2
TEST: PR triggers CI, merge deploys

PROMPT FOR CLAUDE CODE:
---
Create GitHub Actions.

.github/workflows/ci.yml:
- Lint, typecheck, test, build

.github/workflows/deploy.yml:
- Deploy to EC2, Vercel
---
```

---

## P3.3: Monitoring

### P3.3.1: Logging

```
TASK ID: P3.3.1
DESCRIPTION: Application monitoring
FILES TO CREATE:
  - apps/api/src/lib/logger.ts
DEPENDENCIES: P3.2.1
TEST: Logs in CloudWatch

PROMPT FOR CLAUDE CODE:
---
Setup logging.

Add dependency: winston

src/lib/logger.ts:
- Console for dev, CloudWatch for prod
- Request logging middleware
---
```

---

# Summary Checklist

```
PHASE 0 (14 tasks): Setup monorepo, backend, database, frontend, code executor
PHASE 1 (16 tasks): Auth, profile, questions, interview, editor, AI, dashboard, feedback
PHASE 2 (10 tasks): System Design, pause/resume, adaptive, enhanced feedback, concurrency
PHASE 3 (5 tasks): AWS, CI/CD, monitoring

Total: 45 tasks
```
