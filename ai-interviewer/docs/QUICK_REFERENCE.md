# Quick Reference Card (Windows)

Print this or keep it handy during development.

---

## Service URLs (Development)

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | - |
| **Backend API** | http://localhost:3000 | - |
| **API Health** | http://localhost:3000/health | - |
| **Code Executor** | http://localhost:8000 | - |
| **PostgreSQL** | localhost:5432 | postgres / postgres |
| **Redis** | localhost:6379 | - |
| **Prisma Studio** | http://localhost:5555 | - |

---

## External Services

| Service | Console URL | Purpose |
|---------|-------------|---------|
| **Google Cloud** | https://console.cloud.google.com | OAuth credentials |
| **Groq** | https://console.groq.com | LLM API keys |
| **AWS** | https://console.aws.amazon.com | Infrastructure |
| **Vercel** | https://vercel.com/dashboard | Frontend hosting |
| **GitHub** | https://github.com | Code repository |

---

## API Keys Location

All keys should be in `.env` file (never commit this!):

```bash
# .env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GROQ_API_KEY=gsk_xxx
JWT_SECRET=xxx
JWT_REFRESH_SECRET=xxx
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_interviewer_dev
REDIS_URL=redis://localhost:6379
```

---

## Common Commands (Git Bash)

### Starting Development

```bash
# Make sure Docker Desktop is running first!

# Start everything
pnpm docker:up          # Start PostgreSQL & Redis
pnpm dev                # Start API + Web

# Or step by step:
pnpm docker:up          # Start DB & Redis
pnpm dev:api            # Start backend (port 3000)
pnpm dev:web            # Start frontend (port 5173)
```

### Database

```bash
pnpm db:migrate         # Run migrations
pnpm db:seed            # Seed data
pnpm db:studio          # Open Prisma Studio (GUI)

# Direct database access
docker exec -it ai-interviewer-db psql -U postgres -d ai_interviewer_dev

# Redis access
docker exec -it ai-interviewer-redis redis-cli
```

### Docker

```bash
pnpm docker:up          # Start containers
pnpm docker:down        # Stop containers
pnpm docker:logs        # View logs
docker ps               # List running containers
```

### Git

```bash
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit
git push                # Push to GitHub
git pull                # Pull latest
```

### Beads (Task Tracking)

```bash
bd ready                # See available tasks
bd create "title" -p 1  # Create new task (p0-p4 priority)
bd update <id> --status in_progress
bd update <id> --notes "Progress update"
bd close <id> --reason "What was done"
bd list                 # All open tasks
bd stats                # Progress overview
```

---

## Claude Code Workflow

### Slash Commands

```
/start-session          # Begin work, see ready tasks
/new-feature <name>     # Plan a new feature
/code-review            # Review recent changes
/fix-issue <id>         # Fix a beads issue
/land-the-plane         # End session properly
```

### Sub-Agents

```
"Run plan-reviewer on this plan"
"Run code-reviewer on my changes"
"Have test-writer generate tests for X"
"Run security-auditor on this feature"
```

### Context Management

```
/cost                   # Check context usage
/compact                # Compress conversation
/clear                  # Reset context entirely
Shift+Tab+Tab           # Enter plan mode
```

---

## Project Structure

```
ai-mock-interviewer/
├── .claude/              # Claude Code config
│   ├── agents/           # Sub-agents
│   ├── commands/         # Slash commands
│   └── settings.json     # Hooks
├── .beads/               # Task tracking
├── apps/
│   ├── api/              # Express backend (port 3000)
│   ├── web/              # React frontend (port 5173)
│   └── code-executor/    # Python service (port 8000)
├── docker/               # Docker configs
├── docs/                 # Documentation
├── packages/             # Shared code
└── CLAUDE.md             # Project config
```

---

## Ports Summary

| Port | Service |
|------|---------|
| 3000 | Backend API |
| 5173 | Frontend (Vite) |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 8000 | Code Executor |
| 5555 | Prisma Studio |

---

## Tech Stack Cheatsheet

| Layer | Tech | Docs |
|-------|------|------|
| **Frontend** | React 18 | https://react.dev |
| **Styling** | TailwindCSS | https://tailwindcss.com/docs |
| **State** | Zustand | https://zustand-demo.pmnd.rs |
| **Code Editor** | Monaco | https://microsoft.github.io/monaco-editor |
| **Backend** | Express.js | https://expressjs.com |
| **ORM** | Prisma | https://www.prisma.io/docs |
| **WebSocket** | Socket.io | https://socket.io/docs |
| **Database** | PostgreSQL | https://www.postgresql.org/docs |
| **Cache** | Redis | https://redis.io/docs |
| **AI** | Groq API | https://console.groq.com/docs |
| **Auth** | Passport.js | https://www.passportjs.org |

---

## Groq Models

| Model | Best For | Speed |
|-------|----------|-------|
| `llama-3.1-70b-versatile` | Complex interviews | Medium |
| `llama-3.1-8b-instant` | Quick responses | Fast |
| `mixtral-8x7b-32768` | Long context | Medium |

---

## File Naming Conventions

```
Components:  PascalCase.tsx     (Button.tsx, ChatPanel.tsx)
Hooks:       useCamelCase.ts    (useAuth.ts, useInterview.ts)
Utils:       camelCase.ts       (formatDate.ts, helpers.ts)
Types:       camelCase.ts       (index.ts, api.ts)
Routes:      kebab-case.ts      (auth.routes.ts)
Services:    kebab-case.ts      (auth.service.ts)
```

---

## Commit Message Format

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, no code change
refactor: code restructuring
test: adding tests
chore: maintenance tasks

Examples:
feat: add Google OAuth login
fix: resolve WebSocket disconnect issue
docs: update API documentation
```

---

## Useful VS Code Shortcuts

| Action | Shortcut |
|--------|----------|
| Open terminal | Ctrl + ` |
| Command palette | Ctrl + Shift + P |
| Quick file open | Ctrl + P |
| Find in files | Ctrl + Shift + F |
| Go to definition | F12 |
| Rename symbol | F2 |
| Format document | Shift + Alt + F |
| Toggle sidebar | Ctrl + B |

---

## Troubleshooting Quick Fixes

### "command not found"
Close Git Bash and reopen it.

### Docker not starting
1. Make sure Docker Desktop is running
2. Check virtualization is enabled in BIOS

### Port already in use
```bash
# Find what's using port 3000
netstat -ano | findstr :3000
# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Node modules issues
```bash
rm -rf node_modules
pnpm install
```

### Database connection failed
```bash
# Check if PostgreSQL container is running
docker ps
# If not, start it
pnpm docker:up
```

---

## Documentation Files

| File | Content |
|------|---------|
| `00_SOFTWARE_SETUP.md` | Install all tools (Windows) |
| `01_DESIGN_DECISIONS.md` | Architecture choices |
| `02_SERVICE_ARCHITECTURE.md` | System design diagrams |
| `03_DATA_MODEL.md` | Database schema (Prisma) |
| `04_IMPLEMENTATION_ROADMAP.md` | Phase-by-phase plan |
| `05_ENVIRONMENT_SETUP.md` | Env vars, Docker configs |
| `06_CLAUDE_CODE_TASKS.md` | Task prompts for Claude Code |
| `07_AGENTIC_DEVELOPMENT.md` | Sub-agents, Beads, workflows |
| `QUICK_REFERENCE.md` | This cheatsheet |

## Project Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Claude Code project config |
| `.claude/agents/*.md` | Sub-agent definitions |
| `.claude/commands/*.md` | Slash commands |
| `.claude/settings.json` | Hooks and permissions |
| `.beads/` | Task tracking database | |
