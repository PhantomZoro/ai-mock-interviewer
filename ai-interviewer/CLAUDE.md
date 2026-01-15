# AI Mock Interviewer

## MANDATORY WORKFLOW - READ THIS FIRST!

### CRITICAL: Session Initialization
**Before doing ANY work in a new terminal session:**

1. **READ the workflow files first:**
   - Read ALL files in `.claude/commands/` to understand available commands
   - Read ALL files in `.claude/agents/` to understand available agents
   - This is NON-NEGOTIABLE for every new session

2. **EXPLICITLY invoke commands** - Do NOT just follow the workflow conceptually. You MUST literally invoke each slash command by name using the Skill tool.

---

## EXPLICIT COMMAND INVOCATION (MANDATORY)

**Every task MUST follow this exact sequence with EXPLICIT command invocations:**

### Step 1: Start Session (ALWAYS FIRST)
```
/start-session
```
**You MUST invoke this command explicitly** at the beginning of every work session. This shows available tasks from beads and orients you to the project state.

### Step 2: Begin Work (CHOOSE ONE)

**For New Features:**
```
/new-feature <task-name>
```
**You MUST invoke this command explicitly.** This command:
1. Enters plan mode (NO CODE until plan is approved!)
2. Researches the codebase thoroughly
3. Creates a detailed implementation plan
4. **Runs plan-reviewer agent** to review the plan
5. Creates beads issue with `bd create`
6. Waits for user approval before ANY implementation

**For Bug Fixes:**
```
/fix-issue <beads-id>
```
**You MUST invoke this command explicitly.**

### Step 3: Code Review (BEFORE ANY COMMIT)
```
/code-review
```
**You MUST invoke this command explicitly** before creating any commit. This runs the **code-reviewer agent** which checks for bugs, security issues, and code quality problems.

### Step 4: End Session (ALWAYS LAST)
```
/land-the-plane
```
**You MUST invoke this command explicitly** at the end of every work session. This:
- Runs all quality gates (lint, typecheck, test)
- Updates beads with completion notes
- Creates commit with proper message
- Pushes to remote
- Provides session summary

---

## AGENT USAGE (MANDATORY)

| Agent | When to Use | Invocation |
|-------|-------------|------------|
| **plan-reviewer** | BEFORE any coding starts | Via `/new-feature` or Task tool |
| **code-reviewer** | BEFORE any commit | Via `/code-review` or Task tool |
| **test-writer** | After implementing features | Via Task tool |
| **security-auditor** | For security-sensitive code | Via Task tool |

**plan-reviewer and code-reviewer are MANDATORY, not optional!**

---

## WORKFLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    NEW SESSION STARTED                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  1. Read .claude/commands/ and .claude/agents/ files        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. INVOKE: /start-session                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. INVOKE: /new-feature OR /fix-issue                      │
│     → plan-reviewer agent runs automatically                │
│     → Wait for user approval                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Implement code (only AFTER plan approval)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  5. INVOKE: /code-review                                    │
│     → code-reviewer agent runs                              │
│     → Fix any issues found                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  6. INVOKE: /land-the-plane                                 │
│     → Quality gates → Beads update → Commit → Push          │
└─────────────────────────────────────────────────────────────┘
```

---

## USER PREFERENCES (ADAPT TO THESE)

This section captures the user's working style. Claude should adapt to these preferences:

### Workflow Style
- **Structured, documented processes** - Every task should be planned and tracked
- **Explicit command invocation** - User wants to see each command invoked, not just followed implicitly
- **Beads issue tracking** - All work should be tracked in `.beads/issues.jsonl`
- **Plan before code** - Always use plan mode and plan-reviewer before any implementation
- **Review before commit** - Always run code-reviewer before any commit

### Communication Style
- **Clear progress updates** - Show what step you're on in the workflow
- **Acknowledge command invocations** - When invoking a command, state it clearly
- **Document decisions** - Add notes to beads issues explaining what was done and why

### Quality Expectations
- **No shortcuts** - Follow the full workflow even for "simple" tasks
- **Use all available tools** - Agents, commands, and beads are there to be used
- **TypeScript strict mode** - No `any` types, no implicit any
- **Tests and linting** - Must pass before any commit

---

## SELF-UPDATING INSTRUCTIONS

**IMPORTANT: This CLAUDE.md file should evolve based on user feedback.**

When the user:
- Corrects your workflow approach → Update the MANDATORY WORKFLOW section
- Expresses preferences about how to work → Update the USER PREFERENCES section
- Identifies missing instructions → Add them to the appropriate section
- Provides feedback on communication style → Update accordingly

**After receiving user feedback about workflow or preferences, consider whether CLAUDE.md needs updating to prevent the same issue in future sessions.**

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

**MANDATORY agents (must use every task):**
- **plan-reviewer**: Reviews architectural plans BEFORE any coding begins
- **code-reviewer**: Reviews code for bugs, security, style BEFORE any commit

**Optional agents (use as needed):**
- **test-writer**: Generates comprehensive tests
- **security-auditor**: Checks for vulnerabilities
- **explore**: Fast read-only codebase exploration

**Agent files are in `.claude/agents/` - READ THEM at session start!**

## Important Rules

### AT SESSION START (NON-NEGOTIABLE)
1. Read ALL files in `.claude/commands/`
2. Read ALL files in `.claude/agents/`
3. Explicitly invoke `/start-session`
4. Review beads for current project state

### ALWAYS
- **EXPLICITLY invoke each slash command** - Don't just follow conceptually
- **Run /start-session** at beginning of every session
- **Run /new-feature or /fix-issue** to begin any task
- **Run /code-review** before ANY commit (uses code-reviewer agent)
- **Run /land-the-plane** at end of every session
- Use plan mode and **plan-reviewer agent** before coding new features
- Update beads when starting/finishing tasks
- Include `.beads/issues.jsonl` in commits
- Keep context under 50% (check with /cost)

### NEVER
- Skip explicit command invocation (don't just follow workflow mentally)
- Start coding before plan-reviewer has approved the plan
- Commit without running code-reviewer first
- End session without running /land-the-plane
- Commit with failing tests or lint errors
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
