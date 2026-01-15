# AI Mock Interviewer

## MANDATORY WORKFLOW - READ FIRST!

**STOP! Before doing ANY work, you MUST follow this workflow:**

### Starting a Session
```
/start-session
```
This will show available tasks from beads. Pick one and update its status.

### For New Features/Tasks
```
/new-feature <task-name>
```
This command will:
1. Enter plan mode (NO CODE YET!)
2. Research the codebase
3. Create detailed plan
4. **Run plan-reviewer agent** to review the plan
5. Create beads issues with `bd create`
6. Wait for user approval before implementing

### For Bug Fixes
```
/fix-issue <beads-id>
```

### Before ANY Commit
```
/code-review
```
This runs the **code-reviewer agent** on your changes.

### Ending a Session
```
/land-the-plane
```
Runs quality gates, updates beads, commits.

### Available Slash Commands
| Command | Purpose |
|---------|---------|
| `/start-session` | Begin work, see tasks |
| `/new-feature X` | Plan new feature with review |
| `/fix-issue <id>` | Fix a beads issue |
| `/code-review` | Review changes before commit |
| `/land-the-plane` | End session properly |

### Sub-Agents (use via Task tool)
| Agent | When to Use |
|-------|-------------|
| **plan-reviewer** | BEFORE coding - reviews architectural plans |
| **code-reviewer** | BEFORE commit - reviews code for bugs/security |
| **test-writer** | Generate tests for features |
| **security-auditor** | Security review |

**The workflow files are in `.claude/commands/` and `.claude/agents/` - READ THEM!**

---

## Project Overview
AI-powered mock interview platform for DSA and System Design practice.
Built with React, Node.js, PostgreSQL, Redis, and Groq AI.

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, Zustand, Monaco Editor, Socket.io Client
- **Backend**: Node.js, Express, TypeScript, Socket.io, Prisma ORM, Passport.js
- **Database**: PostgreSQL (Docker), Redis (Docker)
- **AI**: Groq API (Llama 3.1 70B, Mixtral)
- **Code Execution**: Python FastAPI with Docker sandbox

## Project Structure
```
ai-mock-interviewer/
├── apps/
│   ├── api/              # Express backend (port 3000)
│   │   ├── src/
│   │   │   ├── routes/       # API routes
│   │   │   ├── controllers/  # Request handlers
│   │   │   ├── services/     # Business logic
│   │   │   ├── middleware/   # Auth, validation, errors
│   │   │   ├── websocket/    # Socket.io handlers
│   │   │   └── config/       # Configuration
│   │   └── prisma/           # Database schema & migrations
│   ├── web/              # React frontend (port 5173)
│   │   └── src/
│   │       ├── pages/        # Route components
│   │       ├── components/   # Reusable UI
│   │       ├── hooks/        # Custom React hooks
│   │       ├── stores/       # Zustand state
│   │       └── services/     # API client
│   └── code-executor/    # Python service (port 8000)
├── docker/               # Docker Compose configs
├── docs/                 # Documentation
├── .beads/               # Issue tracker database
└── .claude/              # Claude Code configuration
```

## Commands
```bash
pnpm dev              # Start all services
pnpm dev:api          # Start only backend
pnpm dev:web          # Start only frontend
pnpm docker:up        # Start PostgreSQL & Redis
pnpm docker:down      # Stop containers
pnpm db:migrate       # Run Prisma migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm lint             # Run linter
pnpm typecheck        # Check TypeScript types
pnpm test             # Run all tests
pnpm build            # Build for production
```

## Coding Standards

### TypeScript
- Strict mode enabled, no implicit any
- Prefer `interface` over `type` for objects
- Use early returns to reduce nesting
- Functions should do one thing
- Destructure parameters for clarity
- No magic numbers - use named constants

### React
- Functional components only, no classes
- Custom hooks for reusable logic (`useAuth`, `useInterview`)
- Zustand for global state, React Query for server state
- TailwindCSS only - no CSS files or styled-components
- Component naming: PascalCase (`ChatPanel.tsx`)
- Props interface above component definition

### Backend
- Controllers: thin, HTTP handling only
- Services: business logic, database calls
- Validate ALL input with Zod schemas
- Response format: `{ success: boolean, data?: T, error?: string }`
- Use HTTP status codes correctly (200, 201, 400, 401, 403, 404, 500)

### Error Handling
- Never swallow errors silently
- Log errors with full context (userId, action, error)
- Return user-friendly messages to frontend
- Use custom error classes (AuthError, ValidationError, etc.)

### Testing
- Unit tests for services and utilities
- Integration tests for API routes
- Test file next to source: `auth.service.ts` → `auth.service.test.ts`
- Use factories for test data generation

## Git Workflow
- Branch naming: `feature/auth`, `fix/websocket-disconnect`, `refactor/services`
- Commit format: `type: description`
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `refactor:` code restructuring
  - `test:` adding tests
  - `chore:` maintenance
- Run tests before every commit
- One logical change per commit

## Task Tracking with Beads

This project uses `bd` (beads) for issue tracking. Issues persist in `.beads/` and survive context compaction.

### Session Start
```bash
bd ready              # See available tasks
bd update <id> --status in_progress
```

### While Working
```bash
bd create "Bug: X happens when Y" -p 1    # Create issues for bugs found
bd dep add <new-id> <blocker-id>          # Link dependencies
bd update <id> --notes "Progress update"  # Add notes
```

### Session End
```bash
bd update <id> --notes "What was done"
bd close <id> --reason "Description"      # If complete
git add .beads/issues.jsonl               # Include in commit
```

## Session Protocol

### Starting Work
1. Run `bd ready` to see available tasks
2. Pick highest priority unblocked task
3. Update status: `bd update <id> --status in_progress`
4. Use plan mode for complex tasks (Shift+Tab twice)

### Ending Work ("Land the Plane")
1. Run quality gates:
   - `pnpm lint` - fix errors
   - `pnpm typecheck` - fix type errors  
   - `pnpm test` - ensure tests pass
2. Update beads with what was done
3. Close completed issues
4. Commit with descriptive message
5. Push to remote

## Sub-Agents Available
- **plan-reviewer**: Reviews architectural plans before coding
- **code-reviewer**: Reviews code for bugs, security, style
- **test-writer**: Generates comprehensive tests
- **security-auditor**: Checks for vulnerabilities
- **explore**: Fast read-only codebase exploration

## Important Rules

### ALWAYS
- Use plan mode first for new features
- Run code-reviewer before committing
- Keep context under 50% (check with /cost)
- Update beads when starting/finishing tasks
- Include `.beads/issues.jsonl` in commits

### NEVER
- Commit with failing tests
- Use `any` type in TypeScript
- Expose sensitive data in logs or responses
- Skip input validation
- Ignore linting errors

## Architecture Decisions
- See `docs/01_DESIGN_DECISIONS.md` for all architectural choices
- System Design interviews are conversation + MCQ/scenario (no diagrams)
- Pause validity: 24 hours
- One active interview per user
- Code execution: 10s timeout, 256MB memory limit

## Environment
- Windows development with Git Bash
- Docker Desktop for containers
- Node.js 18 LTS via nvm-windows
- pnpm for package management
