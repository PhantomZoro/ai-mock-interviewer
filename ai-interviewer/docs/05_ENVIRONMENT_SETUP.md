# Environment Setup (Windows)

## Environment Variables

### Development (.env)

Create a `.env` file in your project root (never commit this!):

```bash
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database (Docker)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_interviewer_dev
REDIS_URL=redis://localhost:6379

# Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars

# AI
GROQ_API_KEY=your_groq_api_key

# Code Executor
CODE_EXECUTOR_URL=http://localhost:8000
```

### Generate Secrets

In Git Bash, generate random secrets:

```bash
# Generate JWT_SECRET (copy the output)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_REFRESH_SECRET (copy the output)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Production (.env.production)

```bash
# Server
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourdomain.com

# Database (AWS RDS)
DATABASE_URL=postgresql://user:pass@your-rds-endpoint:5432/ai_interviewer_prod

# Redis
REDIS_URL=redis://localhost:6379

# Auth
GOOGLE_CLIENT_ID=your_prod_google_client_id
GOOGLE_CLIENT_SECRET=your_prod_google_client_secret
JWT_SECRET=production_jwt_secret_very_long_and_random
JWT_REFRESH_SECRET=production_refresh_secret_very_long_and_random

# AI
GROQ_API_KEY=your_groq_api_key

# AWS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=ai-interviewer-prod
```

---

## Folder Structure

### Phase 0: Initial Setup

```
ai-mock-interviewer/
├── .github/
│   └── workflows/           # CI/CD (empty for now)
├── apps/
│   ├── api/                 # Node.js backend
│   │   ├── src/
│   │   │   ├── index.ts     # Entry point
│   │   │   ├── app.ts       # Express app setup
│   │   │   └── config/
│   │   │       └── env.ts   # Environment config
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── pages/
│   │   │   │   └── Home.tsx
│   │   │   └── components/
│   │   │       └── Layout.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   │
│   └── code-executor/       # Python service
│       ├── src/
│       │   └── main.py
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/                # Shared code (future)
│   └── shared/
│       └── package.json
│
├── docker/
│   └── docker-compose.yml   # Dev services (PostgreSQL, Redis)
│
├── .env                     # Environment variables (don't commit!)
├── .env.example             # Template for .env
├── .gitignore
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # Monorepo config
├── tsconfig.base.json       # Shared TS config
└── README.md
```

### Phase 1: After MVP

```
ai-mock-interviewer/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── app.ts
│   │   │   ├── config/
│   │   │   │   ├── env.ts
│   │   │   │   └── groq.ts
│   │   │   ├── routes/
│   │   │   │   ├── index.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── interview.routes.ts
│   │   │   │   └── question.routes.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── interview.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── interview.service.ts
│   │   │   │   └── ai/
│   │   │   │       ├── groq.client.ts
│   │   │   │       └── dsa-interviewer.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   └── error.middleware.ts
│   │   │   ├── websocket/
│   │   │   │   ├── index.ts
│   │   │   │   └── handlers/
│   │   │   │       └── interview.handler.ts
│   │   │   ├── utils/
│   │   │   │   ├── jwt.ts
│   │   │   │   └── logger.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       ├── migrations/
│   │       └── seed.ts
│   │
│   └── web/
│       └── src/
│           ├── pages/
│           │   ├── Home.tsx
│           │   ├── Login.tsx
│           │   ├── Dashboard.tsx
│           │   └── Interview.tsx
│           ├── components/
│           │   ├── common/
│           │   ├── layout/
│           │   └── interview/
│           │       ├── ChatPanel.tsx
│           │       ├── CodeEditor.tsx
│           │       └── TestResults.tsx
│           ├── hooks/
│           │   ├── useAuth.ts
│           │   └── useInterview.ts
│           ├── stores/
│           │   ├── authStore.ts
│           │   └── interviewStore.ts
│           └── services/
│               ├── api.ts
│               └── socket.ts
│
└── ...
```

---

## Docker Compose (Windows Compatible)

### docker/docker-compose.yml

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: ai-interviewer-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ai_interviewer_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: ai-interviewer-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

---

## NPM Scripts (package.json)

Add these scripts to your root `package.json`:

```json
{
  "name": "ai-mock-interviewer",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm run dev:api\" \"pnpm run dev:web\"",
    "dev:api": "pnpm --filter @ai-interviewer/api dev",
    "dev:web": "pnpm --filter @ai-interviewer/web dev",
    "build": "pnpm --filter @ai-interviewer/api build && pnpm --filter @ai-interviewer/web build",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck",
    "docker:up": "docker compose -f docker/docker-compose.yml up -d",
    "docker:down": "docker compose -f docker/docker-compose.yml down",
    "docker:logs": "docker compose -f docker/docker-compose.yml logs -f",
    "db:migrate": "pnpm --filter @ai-interviewer/api db:migrate",
    "db:seed": "pnpm --filter @ai-interviewer/api db:seed",
    "db:studio": "pnpm --filter @ai-interviewer/api db:studio",
    "db:reset": "pnpm --filter @ai-interviewer/api db:reset"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.3.3"
  }
}
```

---

## Development Workflow (Git Bash)

### Starting Development

```bash
# 1. Start Docker containers (PostgreSQL & Redis)
pnpm docker:up

# 2. Wait for containers to be ready (check Docker Desktop or run)
docker ps
# Should show both containers running

# 3. Run database migrations (first time or after schema changes)
pnpm db:migrate

# 4. Seed the database (first time)
pnpm db:seed

# 5. Start the development servers
pnpm dev
# This starts both API (port 3000) and Web (port 5173)
```

### Daily Development

```bash
# Make sure Docker Desktop is running, then:
pnpm docker:up
pnpm dev
```

### Stopping Development

```bash
# Stop the dev servers: Ctrl+C

# Stop Docker containers
pnpm docker:down
```

---

## Database Commands

### Prisma Commands

```bash
# Run migrations (apply schema changes to DB)
pnpm db:migrate

# Create a new migration
cd apps/api
npx prisma migrate dev --name your_migration_name

# Seed the database
pnpm db:seed

# Open Prisma Studio (GUI for database)
pnpm db:studio
# Opens at http://localhost:5555

# Reset database (drops all data!)
cd apps/api
npx prisma migrate reset

# Generate Prisma Client (after schema changes)
cd apps/api
npx prisma generate
```

### Direct Database Access

```bash
# Using Docker psql
docker exec -it ai-interviewer-db psql -U postgres -d ai_interviewer_dev

# Common psql commands:
# \l          List databases
# \dt         List tables
# \d users    Describe users table
# SELECT * FROM users;
# \q          Quit
```

### Redis Access

```bash
# Using Docker redis-cli
docker exec -it ai-interviewer-redis redis-cli

# Common redis commands:
# PING        Test connection (returns PONG)
# KEYS *      List all keys
# GET key     Get value
# SET k v     Set value
# FLUSHALL    Clear all data
# QUIT        Exit
```

---

## VS Code Settings

### .vscode/settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "emmet.includeLanguages": {
    "typescriptreact": "html"
  }
}
```

### .vscode/extensions.json

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "ms-azuretools.vscode-docker",
    "rangav.vscode-thunder-client",
    "ms-python.python",
    "ms-python.vscode-pylance"
  ]
}
```

---

## Git Configuration

### .gitignore

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*

# Testing
coverage/

# Prisma
apps/api/prisma/migrations/**/migration_lock.toml

# Python
__pycache__/
*.py[cod]
venv/
.venv/

# Docker
.docker/
```

### .env.example

```bash
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_interviewer_dev
REDIS_URL=redis://localhost:6379

# Auth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
JWT_REFRESH_SECRET=

# AI (get from console.groq.com)
GROQ_API_KEY=

# Code Executor
CODE_EXECUTOR_URL=http://localhost:8000
```

---

## Testing Checklist by Phase

### Phase 0: Setup Verification

```
□ pnpm install completes without errors
□ Docker containers start (pnpm docker:up)
□ Can connect to PostgreSQL (docker exec -it ai-interviewer-db psql -U postgres)
□ Can connect to Redis (docker exec -it ai-interviewer-redis redis-cli PING)
□ Backend starts (pnpm dev:api) - http://localhost:3000/health
□ Frontend starts (pnpm dev:web) - http://localhost:5173
```

### Phase 1: MVP Verification

```
□ Google OAuth login works
□ User created in database after login
□ JWT tokens stored in cookies
□ Protected routes redirect to login
□ Can start DSA interview
□ AI responds to messages
□ Code editor loads and accepts input
□ Code execution returns results
□ Interview completes with feedback
□ Dashboard shows interview history
```

### Phase 2: Feature Verification

```
□ System Design interview flow works
□ MCQ questions display correctly
□ Pause saves interview state
□ Resume restores interview correctly
□ Adaptive difficulty adjusts questions
□ Analytics display correctly
```

---

## Common Commands Reference

```bash
# Development
pnpm dev                # Start all services
pnpm dev:api           # Start only backend
pnpm dev:web           # Start only frontend

# Docker
pnpm docker:up         # Start PostgreSQL & Redis
pnpm docker:down       # Stop containers
pnpm docker:logs       # View container logs

# Database
pnpm db:migrate        # Run migrations
pnpm db:seed           # Seed data
pnpm db:studio         # Open Prisma Studio

# Code Quality
pnpm lint              # Run linter
pnpm typecheck         # Check types

# Git
git status             # Check changes
git add .              # Stage all
git commit -m "msg"    # Commit
git push               # Push to GitHub
```

---

## Port Reference

| Port | Service |
|------|---------|
| 3000 | Backend API (Express) |
| 5173 | Frontend (Vite/React) |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 8000 | Code Executor (Python) |
| 5555 | Prisma Studio |
