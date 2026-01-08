# Agentic Development Guide

## Complete Guide to Building with Claude Code's Advanced Features

This document explains how to implement cutting-edge agentic development patterns for the AI Mock Interviewer project on Windows.

---

## Table of Contents

1. [Overview: The Agentic Workflow](#1-overview-the-agentic-workflow)
2. [CLAUDE.md - Your Project's Constitution](#2-claudemd---your-projects-constitution)
3. [Plan Mode - Think Before Coding](#3-plan-mode---think-before-coding)
4. [Sub-Agents - Specialized Team Members](#4-sub-agents---specialized-team-members)
5. [Beads - Persistent Memory System](#5-beads---persistent-memory-system)
6. [Slash Commands - Custom Workflows](#6-slash-commands---custom-workflows)
7. [Hooks - Automated Quality Gates](#7-hooks---automated-quality-gates)
8. [Context Management - Budget Your Tokens](#8-context-management---budget-your-tokens)
9. [Land the Plane - Session Cleanup Protocol](#9-land-the-plane---session-cleanup-protocol)
10. [Complete Workflow Example](#10-complete-workflow-example)

---

## 1. Overview: The Agentic Workflow

### The Problem with "Vibes-Based" Development

Most people use Claude Code like this:
```
User: "Add user authentication"
Claude: [writes code]
User: "Now add profile page"
Claude: [writes more code]
... context fills up, quality degrades ...
```

**Three failure modes:**
1. **Context drift** - By message 50, Claude forgets your coding standards
2. **No review step** - Code ships without critique, bugs slip through
3. **Lost work** - Clear context window, start over, same mistakes again

### The Solution: Structured Agentic Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AGENTIC WORKFLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PLAN MODE                                                               │
│     └── Think before coding, iterate on plan not code                      │
│                                                                             │
│  2. SUB-AGENT: Plan Reviewer                                                │
│     └── Independent context, catches design flaws                          │
│                                                                             │
│  3. TASK SPLITTER                                                           │
│     └── Creates Beads issues sized for one session                         │
│                                                                             │
│  4. /clear - Reset Context                                                  │
│                                                                             │
│  5. IMPLEMENT                                                               │
│     └── Pick task from Beads, write code                                   │
│                                                                             │
│  6. SUB-AGENT: Code Reviewer                                                │
│     └── Fresh context, catches bugs                                        │
│                                                                             │
│  7. LAND THE PLANE                                                          │
│     └── Tests → Lint → Format → Commit → Push                              │
│                                                                             │
│  8. REPEAT from step 4                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What You'll Learn

| Concept | What It Does | When to Use |
|---------|--------------|-------------|
| **CLAUDE.md** | Project configuration | Every project |
| **Plan Mode** | Think before coding | Every feature |
| **Sub-Agents** | Specialized reviewers | Reviews, research |
| **Beads** | Persistent task memory | Multi-session work |
| **Slash Commands** | Custom workflows | Repeated tasks |
| **Hooks** | Automated quality checks | Every save/commit |
| **Context Management** | Keep context clean | Long sessions |
| **Land the Plane** | Session cleanup | End of every task |

---

## 2. CLAUDE.md - Your Project's Constitution

### What is CLAUDE.md?

A special file that Claude Code automatically reads at the start of every session. It's your project's constitution - rules Claude follows more strictly than user prompts.

### File Locations

```
~/.claude/CLAUDE.md           # User-level (applies to all projects)
./CLAUDE.md                   # Project root (shared with team)
./CLAUDE.local.md             # Personal project preferences (gitignored)
./apps/api/CLAUDE.md          # Package-specific rules
./.claude/rules/*.md          # Modular rules (loaded automatically)
```

### Our Project's CLAUDE.md

Create `CLAUDE.md` in project root:

```markdown
# AI Mock Interviewer

## Project Overview
AI-powered mock interview platform for DSA and System Design practice.
Built with React, Node.js, PostgreSQL, Redis, and Groq AI.

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, Zustand, Monaco Editor
- **Backend**: Node.js, Express, TypeScript, Socket.io, Prisma
- **Database**: PostgreSQL (Docker), Redis (Docker)
- **AI**: Groq API (Llama 3.1)
- **Code Execution**: Python FastAPI with Docker sandbox

## Project Structure
```
ai-mock-interviewer/
├── apps/
│   ├── api/           # Express backend (port 3000)
│   ├── web/           # React frontend (port 5173)
│   └── code-executor/ # Python service (port 8000)
├── docker/            # Docker configs
├── docs/              # Documentation
└── .beads/            # Beads issue tracker
```

## Commands
- `pnpm dev` - Start all services
- `pnpm docker:up` - Start PostgreSQL & Redis
- `pnpm db:migrate` - Run Prisma migrations
- `pnpm db:seed` - Seed database
- `pnpm lint` - Run linter
- `pnpm typecheck` - Check types
- `pnpm test` - Run tests

## Coding Standards

### TypeScript
- Strict mode enabled
- No `any` types - use `unknown` or proper types
- Prefer interfaces over types for objects
- Use early returns to reduce nesting
- Functions should do one thing

### React
- Functional components only, no classes
- Custom hooks for reusable logic
- Zustand for global state
- React Query for server state
- TailwindCSS for styling (no CSS files)

### Backend
- Controllers handle HTTP, services handle business logic
- All async functions must have try/catch
- Use Zod for input validation
- Prisma for database queries
- WebSocket via Socket.io

### Error Handling
- Never swallow errors silently
- Log errors with context
- Return meaningful error messages to frontend
- Use custom error classes

### Testing
- Unit tests for services
- Integration tests for API routes
- Test file next to source: `foo.ts` → `foo.test.ts`

## Git Workflow
- Branch naming: `feature/`, `fix/`, `refactor/`
- Commit format: `type: description` (feat, fix, docs, refactor, test)
- Always run tests before committing
- One logical change per commit

## Known Issues
- Check `.beads/` for current issues with `bd ready`

## Session Protocol

### Starting a Session
1. Run `bd ready` to see available tasks
2. Pick a task and update status: `bd update <id> --status in_progress`

### Ending a Session ("Land the Plane")
1. Run tests: `pnpm test`
2. Run linter: `pnpm lint`
3. Format code: `pnpm format`
4. Update beads: `bd update <id> --notes "What was done"`
5. Close issue if complete: `bd close <id> --reason "Description"`
6. Commit: `git add . && git commit -m "type: description"`
7. Push: `git push`

## Sub-Agents Available
- **plan-reviewer**: Reviews architectural plans
- **code-reviewer**: Reviews code for bugs and style
- **test-writer**: Generates comprehensive tests
- **security-auditor**: Checks for vulnerabilities

## Important Rules
- ALWAYS run plan mode first for new features (Shift+Tab twice)
- ALWAYS run code reviewer before committing
- NEVER commit with failing tests
- Keep context under 50% - use /compact when needed
- Use Beads for task tracking, not markdown TODOs
```

### Modular Rules with .claude/rules/

Create specialized rules in `.claude/rules/`:

**`.claude/rules/typescript.md`**
```markdown
# TypeScript Rules

- Enable strict mode in all tsconfig files
- No `any` - use `unknown` or specific types
- Prefer `interface` over `type` for objects
- Use `readonly` for immutable properties
- Destructure function parameters for clarity
- Use optional chaining (`?.`) over manual null checks
- Prefer `const` assertions for literal types
```

**`.claude/rules/react.md`**
```markdown
# React Rules

- Only functional components with hooks
- One component per file
- Component file = PascalCase
- Props interface above component
- Custom hooks start with `use`
- Use `memo` only when profiling shows need
- Event handlers: `handleEventName`
- Avoid inline functions in JSX when possible
```

**`.claude/rules/api.md`**
```markdown
# API Rules

- RESTful routes: /api/v1/{resource}
- Controllers: thin, delegate to services
- Services: contain business logic
- Validate all input with Zod
- Return consistent response shape:
  ```typescript
  { success: boolean, data?: T, error?: string }
  ```
- Use HTTP status codes correctly
- Log all errors with request context
```

---

## 3. Plan Mode - Think Before Coding

### What is Plan Mode?

A mode where Claude researches and plans WITHOUT writing code. It's like putting Claude in "architect mode" - observe, analyze, plan, but never execute until you approve.

### How to Activate

```
Method 1: Press Shift+Tab twice
Method 2: Start message with "/plan"
Method 3: Type "plan" at the start
```

### The Plan Mode Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PLAN MODE WORKFLOW                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. USER: [Shift+Tab+Tab] "Add Google OAuth authentication"                 │
│                                                                             │
│  2. CLAUDE: Researches codebase, asks clarifying questions                  │
│     - "What OAuth library should I use?"                                    │
│     - "Where should tokens be stored?"                                      │
│     - "How should refresh tokens work?"                                     │
│                                                                             │
│  3. USER: Answers questions                                                 │
│                                                                             │
│  4. CLAUDE: Creates comprehensive plan                                      │
│     - Files to create/modify                                                │
│     - Dependencies to add                                                   │
│     - Step-by-step implementation                                           │
│     - Potential issues                                                      │
│                                                                             │
│  5. USER: Reviews plan, requests changes                                    │
│                                                                             │
│  6. CLAUDE: Revises plan                                                    │
│                                                                             │
│  7. USER: "Execute" or "Proceed"                                            │
│                                                                             │
│  8. CLAUDE: Implements according to approved plan                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Plan Mode Best Practices

1. **Always start features in plan mode**
   - Planning tokens are cheaper than code-change tokens
   - Catches issues before you've invested time coding

2. **Ask Claude to save the plan**
   ```
   "Save this plan to docs/plans/auth-implementation.md"
   ```

3. **Review with a sub-agent**
   ```
   "Run the plan-reviewer agent on this plan"
   ```

4. **Be specific about constraints**
   ```
   "Plan must work within AWS free tier"
   "Must use existing Prisma schema patterns"
   ```

---

## 4. Sub-Agents - Specialized Team Members

### What are Sub-Agents?

Specialized AI assistants that Claude can delegate to. Each has:
- **Own context window** (doesn't bloat main conversation)
- **Custom system prompt** (specialized instructions)
- **Specific tools** (limited permissions)

### Why Sub-Agents Matter

| Problem | Solution |
|---------|----------|
| Main agent forgets review criteria | Code-reviewer has focused instructions |
| Context fills with exploration | Explore agent uses separate context |
| Security issues slip through | Security-auditor catches them |
| Tests are incomplete | Test-writer knows test patterns |

### Creating Sub-Agents

**Method 1: Interactive (Recommended)**
```
/agents
→ Select "Create new agent"
→ Choose "Project level"
→ Describe what you want
→ Claude generates the agent
```

**Method 2: Manual**
Create `.claude/agents/agent-name.md`:

```markdown
---
name: code-reviewer
description: "MUST BE USED before any commit. Reviews code for bugs, security issues, and style violations."
tools: Read, Grep, Glob
---

You are a senior code reviewer for the AI Mock Interviewer project.

## Your Mission
Review code changes against our standards and catch issues before they ship.

## Review Checklist
1. **Correctness**: Does the code do what it's supposed to?
2. **Security**: Any vulnerabilities? Input validation? Auth checks?
3. **Performance**: N+1 queries? Unnecessary re-renders? Memory leaks?
4. **Style**: Follows our TypeScript/React conventions?
5. **Error Handling**: All errors caught and handled properly?
6. **Edge Cases**: What happens with empty arrays? Null values? Timeouts?

## How to Review
1. Run `git diff` to see changes
2. For each file, check against the checklist
3. Provide specific feedback with line numbers
4. Categorize issues:
   - 🔴 **Critical**: Must fix before merge
   - 🟡 **Warning**: Should fix
   - 🟢 **Suggestion**: Nice to have

## Output Format
```markdown
## Code Review: [feature-name]

### Critical Issues
- [file:line] Description of issue
  **Fix**: How to fix it

### Warnings
- [file:line] Description

### Suggestions
- [file:line] Description

### What's Good
- List positive aspects
```
```

### Our Project's Sub-Agents

Create these in `.claude/agents/`:

**1. Plan Reviewer** (`.claude/agents/plan-reviewer.md`)
```markdown
---
name: plan-reviewer
description: "Use PROACTIVELY when reviewing implementation plans. Catches architectural issues before coding begins."
tools: Read, Grep, Glob, WebSearch
---

You are an architect reviewing implementation plans for AI Mock Interviewer.

## Review Criteria
1. **Feasibility**: Can this actually be built as described?
2. **Security**: OAuth, JWT, input validation covered?
3. **Scalability**: Will this work with 1000 concurrent users?
4. **Maintainability**: Is the design clean and modular?
5. **Missing Pieces**: What's not mentioned that should be?

## Our Constraints
- AWS free tier (t2.micro EC2, db.t3.micro RDS)
- Groq free tier (30 req/min)
- No budget for external services

## Output Format
### Plan Review

#### ✅ Strengths
- ...

#### ⚠️ Concerns
- Issue: ...
  Suggestion: ...

#### ❌ Blockers
- Issue: ...
  Required: ...

#### 📝 Missing
- ...
```

**2. Test Writer** (`.claude/agents/test-writer.md`)
```markdown
---
name: test-writer
description: "Use for generating comprehensive tests. Expert in Jest, React Testing Library, and API testing."
tools: Read, Write, Edit, Grep, Glob, Bash
---

You are a QA engineer specializing in tests for AI Mock Interviewer.

## Test Types
- **Unit Tests**: Services, utilities, hooks
- **Integration Tests**: API routes with database
- **Component Tests**: React components with RTL

## Our Patterns
- Test files: `foo.test.ts` next to `foo.ts`
- Use `describe` for grouping
- Use `it` for individual tests
- Mock external services (Groq, etc.)
- Use factories for test data

## Coverage Goals
- Happy path
- Error cases
- Edge cases (empty, null, huge data)
- Boundary conditions

## Output
Generate test files with clear comments explaining what each test verifies.
```

**3. Security Auditor** (`.claude/agents/security-auditor.md`)
```markdown
---
name: security-auditor
description: "Use for security review. Checks for OWASP vulnerabilities, auth issues, and data exposure."
tools: Read, Grep, Glob
---

You are a security expert auditing AI Mock Interviewer.

## Check For
1. **Injection**: SQL, NoSQL, Command injection
2. **Auth**: JWT validation, session management
3. **XSS**: Output encoding, Content-Security-Policy
4. **CSRF**: Token validation on state-changing requests
5. **Data Exposure**: Sensitive data in logs, responses, errors
6. **Access Control**: Authorization checks on all endpoints
7. **Dependencies**: Known vulnerabilities in packages

## Output Format
### Security Audit Report

#### 🔴 Critical (Fix Immediately)
- [file:line] Vulnerability description
  **Risk**: What could happen
  **Fix**: How to fix

#### 🟡 High
- ...

#### 🟢 Low
- ...

#### ✅ Good Practices Found
- ...
```

**4. Explore Agent** (`.claude/agents/explore.md`)
```markdown
---
name: explore
description: "Fast, read-only codebase exploration. Use for research tasks without bloating main context."
tools: Read, Grep, Glob, Bash
---

You are a codebase explorer for AI Mock Interviewer.

## Your Role
Quickly search and analyze the codebase to answer questions without making changes.

## Search Strategies
1. Use `grep -r` for specific strings
2. Use `find` for file patterns
3. Read key files completely
4. Summarize findings concisely

## Output
Provide clear, organized findings that the main agent can use.
Always include file paths and line numbers.
```

### How to Invoke Sub-Agents

```
# Explicit invocation
"Run the code-reviewer agent on my changes"
"Use the security-auditor to check this PR"
"Have the test-writer generate tests for auth.service.ts"

# Automatic invocation
Claude will automatically use agents based on their description field
when the task matches.
```

---

## 5. Beads - Persistent Memory System

### What is Beads?

A git-backed issue tracker designed for AI agents. Tasks persist as JSON in `.beads/`, tracked like code. When context compacts or sessions crash, the work graph survives.

### Why Beads Matters

| Problem | Beads Solution |
|---------|----------------|
| Context window resets, lose all progress | Tasks stored in git, persist forever |
| Markdown TODOs get out of sync | Single source of truth in `.beads/` |
| Can't coordinate multiple agents | Dependency graphs, hash-based IDs |
| Hard to resume after days away | Pick up exactly where you left off |

### Installing Beads on Windows

**Option 1: npm (Recommended for Windows)**
```bash
npm install -g @beads/bd
bd version
```

**Option 2: Go install**
```bash
# Install Go first: https://go.dev/dl/
go install github.com/steveyegge/beads/cmd/bd@latest

# Add to PATH (add to ~/.bashrc for persistence)
export PATH="$PATH:$HOME/go/bin"
```

### Setting Up Beads in Project

```bash
# Initialize beads
bd init

# This creates:
# .beads/           - Database directory
# .beads/issues.jsonl - Issues stored as JSON lines
```

### Beads Commands

```bash
# Create issues
bd create "Add Google OAuth" -p 1                    # Priority 1 (P0=highest)
bd create "Create login page" -p 2 --parent bd-abc   # Child of epic

# View issues
bd ready                          # Tasks ready to work on (no blockers)
bd list                           # All open issues
bd list --status in_progress      # Filter by status
bd show bd-abc                    # Show specific issue

# Work on issues
bd update bd-abc --status in_progress
bd update bd-abc --notes "Completed OAuth, working on session management"

# Dependencies
bd dep add bd-xyz bd-abc          # bd-xyz is blocked by bd-abc

# Close issues
bd close bd-abc --reason "Implemented OAuth with Passport.js"

# Stats
bd stats                          # Overall progress
```

### Beads Workflow for Our Project

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BEADS WORKFLOW                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SESSION START                                                              │
│  ├── bd ready                    # See what's available                     │
│  ├── Pick highest priority unblocked task                                  │
│  └── bd update <id> --status in_progress                                   │
│                                                                             │
│  WHILE WORKING                                                              │
│  ├── Create issues for discovered bugs                                     │
│  │   └── bd create "Bug: X happens when Y" -p 1                            │
│  ├── Link related issues                                                   │
│  │   └── bd dep add <new> <blocker>                                        │
│  └── Add notes periodically                                                │
│      └── bd update <id> --notes "Progress update"                          │
│                                                                             │
│  SESSION END                                                                │
│  ├── bd update <id> --notes "What was done, what's left"                   │
│  ├── If complete: bd close <id> --reason "Description"                     │
│  ├── If incomplete: leave as in_progress for next session                  │
│  └── Commit .beads/issues.jsonl with other changes                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Creating Initial Issues for AI Mock Interviewer

```bash
# Initialize beads
bd init --prefix ai

# Create Phase 0 Epic
bd create "Epic: Project Setup" -p 0 --type epic
# Returns: ai-abc123

# Create Phase 0 Tasks
bd create "Initialize monorepo with pnpm" -p 1 --parent ai-abc123
bd create "Setup TypeScript configuration" -p 1 --parent ai-abc123
bd create "Setup ESLint and Prettier" -p 1 --parent ai-abc123
bd create "Create Express server skeleton" -p 1 --parent ai-abc123
bd create "Setup Docker Compose for PostgreSQL and Redis" -p 1 --parent ai-abc123
bd create "Setup Prisma with initial schema" -p 1 --parent ai-abc123
bd create "Create React app with Vite" -p 1 --parent ai-abc123
bd create "Setup TailwindCSS" -p 1 --parent ai-abc123
bd create "Create FastAPI code executor service" -p 1 --parent ai-abc123

# Add dependencies (TypeScript must be done before ESLint)
bd dep add ai-xyz ai-abc  # ESLint depends on TypeScript config
```

### Beads in CLAUDE.md

Add this to your CLAUDE.md:

```markdown
## Task Tracking with Beads

This project uses `bd` (beads) for issue tracking.

At session start:
1. Run `bd ready --json` to see available work
2. Pick an issue: `bd update <id> --status in_progress`

While working:
- Create issues for bugs: `bd create "Bug: description" -p 1`
- Link related: `bd dep add <new-id> <blocker-id>`
- Add notes: `bd update <id> --notes "progress update"`

At session end:
- Update notes: `bd update <id> --notes "What was done"`
- Close if complete: `bd close <id> --reason "description"`
- Commit: Include `.beads/issues.jsonl` in commit
```

---

## 6. Slash Commands - Custom Workflows

### What are Slash Commands?

Reusable prompts you invoke by typing `/command-name`. Like macros for common workflows.

### Creating Slash Commands

**Location**: `.claude/commands/`

Each command is a markdown file. The filename (without `.md`) becomes the command name.

### Our Project's Slash Commands

**`.claude/commands/start-session.md`**
```markdown
Start a new development session:

1. Check what tasks are ready:
   - Run `bd ready` to see unblocked tasks
   - Show me the top 3 by priority

2. Let me pick which task to work on

3. Once I choose:
   - Update the task status: `bd update <id> --status in_progress`
   - Read any related files mentioned in the task
   - Give me a brief summary of what needs to be done
```

**`.claude/commands/land-the-plane.md`**
```markdown
End the current session properly:

1. **Run Quality Gates**
   - `pnpm lint` - Fix any linting errors
   - `pnpm typecheck` - Fix any type errors
   - `pnpm test` - Ensure tests pass

2. **Update Beads**
   - For each task I worked on, update notes with what was done
   - If task is complete, close it with a reason
   - Create new issues for any discovered follow-up work

3. **Git Commit**
   - Stage all changes including `.beads/issues.jsonl`
   - Create a descriptive commit message following our format
   - Show me the commit for review before pushing

4. **Summary**
   - Tell me what was accomplished
   - Suggest what to work on next based on `bd ready`
```

**`.claude/commands/code-review.md`**
```markdown
Run a comprehensive code review on recent changes:

1. Get the diff: `git diff HEAD~1` (or staged changes if uncommitted)

2. Use the code-reviewer sub-agent to analyze:
   - Check for bugs and logic errors
   - Check for security issues
   - Check for performance problems
   - Verify our coding standards are followed

3. Present findings organized by severity:
   - 🔴 Critical (must fix)
   - 🟡 Warning (should fix)
   - 🟢 Suggestion (nice to have)

4. For each issue, suggest a specific fix
```

**`.claude/commands/new-feature.md`** with arguments
```markdown
Plan and implement a new feature: $ARGUMENTS

1. **Enter Plan Mode** (don't write code yet)
   - Research the codebase for related functionality
   - Ask me clarifying questions about requirements
   - Create a detailed implementation plan

2. **Review the Plan**
   - Use the plan-reviewer sub-agent
   - Address any concerns raised
   - Revise plan if needed

3. **Create Beads Issues**
   - Break the plan into tasks sized for one session (~40% context)
   - Create an epic for the feature
   - Create child tasks with dependencies
   - Show me the task graph

4. **Wait for Approval**
   - Don't start implementing until I say "proceed"
```

**`.claude/commands/fix-issue.md`**
```markdown
Fix issue: $ARGUMENTS

1. Get the issue details from Beads:
   - `bd show $ARGUMENTS`

2. Research the codebase:
   - Find relevant files
   - Understand the current implementation

3. Create a fix plan:
   - What changes are needed?
   - What tests should be added/updated?

4. Implement the fix

5. Run code review sub-agent

6. Update the Beads issue with what was done
```

### Using Slash Commands

```
/start-session              # Begin working
/new-feature Add hints system during interview
/fix-issue ai-xyz123
/code-review
/land-the-plane             # End session
```

---

## 7. Hooks - Automated Quality Gates

### What are Hooks?

Scripts that run automatically at specific points:
- **PreToolUse**: Before Claude uses a tool
- **PostToolUse**: After Claude uses a tool
- **SessionStart**: When Claude Code starts
- **Stop**: When session ends

### Configuring Hooks

Create `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write $FILE",
        "description": "Format files after editing"
      }
    ],
    "Stop": [
      {
        "matcher": ".*",
        "command": "pnpm lint --quiet",
        "description": "Run linter before stopping"
      }
    ]
  }
}
```

### Our Project's Hooks

**`.claude/settings.json`**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write \"$FILE\"",
        "description": "Auto-format after every edit"
      },
      {
        "matcher": "Write|Edit",
        "command": "npx eslint --fix \"$FILE\" 2>/dev/null || true",
        "description": "Auto-fix lint issues"
      }
    ],
    "SessionStart": [
      {
        "matcher": ".*",
        "command": "echo '🚀 Starting session...' && bd ready | head -5",
        "description": "Show ready tasks at session start"
      }
    ]
  },
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(git:*)",
      "Bash(docker:*)",
      "Bash(bd:*)"
    ]
  }
}
```

### Interactive Hook Setup

```
/hooks
→ Select hook type
→ Configure matcher and command
```

---

## 8. Context Management - Budget Your Tokens

### Understanding Context

Everything stays in context:
- Files you read
- Tool calls and results
- Grep/search results
- Error messages
- Conversation history

**Context is finite. Performance degrades as it fills.**

### Context Best Practices

| Rule | Why |
|------|-----|
| Start complex tasks at 50-60% context | Leave room for iteration |
| Never go above 75% | Performance drops significantly |
| Use sub-agents for exploration | Doesn't bloat main context |
| Compact frequently | Remove old, irrelevant context |

### Monitoring Context

```
/cost                     # Check current context usage
/compact                  # Compress conversation
/clear                    # Clear context entirely
```

### Context-Saving Strategies

**1. Use Explore Sub-Agent for Research**
```
Instead of:
  "Search for all files that use authentication"
  
Do:
  "Use the explore agent to find all auth-related files"
```

**2. Plan First, Then Clear**
```
1. Use plan mode to create plan
2. Save plan to file
3. /clear
4. Implement from saved plan
```

**3. One Task Per Session**
```
Instead of:
  "Add auth, then add dashboard, then add interviews"
  
Do:
  Session 1: "Add auth" → /land-the-plane
  Session 2: "Add dashboard" → /land-the-plane
  Session 3: "Add interviews" → /land-the-plane
```

**4. Avoid Context-Heavy Operations**
```
These eat context fast:
- Reading entire large files
- Verbose error output
- Multiple failed attempts
- Re-explaining preferences

Solutions:
- Read specific line ranges
- Truncate error output
- Learn from failures, update CLAUDE.md
- Put preferences in CLAUDE.md once
```

---

## 9. Land the Plane - Session Cleanup Protocol

### What is "Land the Plane"?

A standard protocol for ending a development session cleanly. Ensures:
- All changes are tested
- Code is formatted and linted
- Issues are updated
- Changes are committed
- Nothing is left hanging

### The Protocol

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LAND THE PLANE PROTOCOL                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. RUN QUALITY GATES                                                       │
│     ├── pnpm lint          # Fix any errors                                │
│     ├── pnpm typecheck     # Fix any type errors                           │
│     ├── pnpm test          # Ensure tests pass                             │
│     └── pnpm build         # Ensure build succeeds                         │
│                                                                             │
│  2. UPDATE BEADS                                                            │
│     ├── For each task worked on:                                           │
│     │   └── bd update <id> --notes "What was done"                         │
│     ├── If task complete:                                                  │
│     │   └── bd close <id> --reason "Description"                           │
│     └── Create issues for discovered follow-up work                        │
│                                                                             │
│  3. GIT OPERATIONS                                                          │
│     ├── git add .                                                          │
│     ├── git status         # Review what's being committed                 │
│     ├── git commit -m "type: description"                                  │
│     └── git push                                                           │
│                                                                             │
│  4. CLEANUP                                                                 │
│     ├── Remove temporary files                                             │
│     ├── Remove debug console.logs                                          │
│     └── Clear any development-only changes                                 │
│                                                                             │
│  5. SUMMARY                                                                 │
│     ├── What was accomplished                                              │
│     ├── What's left to do                                                  │
│     └── Suggested next task (from bd ready)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Trigger

Just say:
```
"land the plane"
```

Or use the slash command:
```
/land-the-plane
```

---

## 10. Complete Workflow Example

### Example: Implementing User Authentication

**Day 1: Planning**

```
# Start session
/start-session
→ No tasks yet, let's create some

# Plan the feature
[Shift+Tab+Tab] "Add Google OAuth authentication with JWT tokens"

# Claude asks clarifying questions, creates plan

# Review with sub-agent
"Run plan-reviewer on this plan"

# Address feedback, revise plan

# Create tasks
"Create beads issues from this plan"

# Claude creates:
# ai-001 Epic: User Authentication
# ai-002 Setup Passport.js with Google strategy
# ai-003 Create auth routes (login, callback, logout)
# ai-004 Implement JWT token generation
# ai-005 Create auth middleware
# ai-006 Create frontend auth flow

/land-the-plane
→ Commits plan docs and .beads/issues.jsonl
```

**Day 2: Implementation Session 1**

```
# Start session
/start-session
→ Shows: ai-002 is ready (no blockers)

# Work on first task
"Let's work on ai-002: Setup Passport.js"

# Claude implements, you review

# Run code review
"Run code-reviewer on these changes"

# Fix any issues

# Land the plane
/land-the-plane
→ Tests pass, linting clean
→ bd update ai-002 --status closed
→ Commits with message "feat: add passport.js google oauth setup"
```

**Day 3: Implementation Session 2**

```
/start-session
→ Shows: ai-003 is now ready (ai-002 done)

# Continue with next task
"Work on ai-003: Create auth routes"

# ... implement ...

/land-the-plane
```

### Summary

This workflow gives you:
- ✅ Persistent memory across sessions (Beads)
- ✅ Independent reviews (Sub-agents)
- ✅ Clean context (Compaction strategy)
- ✅ Quality code (Hooks, quality gates)
- ✅ Consistent commits (Land the plane)
- ✅ Reusable workflows (Slash commands)

---

## Quick Reference

### Daily Workflow

```bash
# Morning
/start-session

# Working
# ... implement feature ...

# Before committing
"Run code-reviewer"

# End of day
/land-the-plane
```

### Key Commands

```
/plan <feature>       # Plan mode for new feature
/agents               # Manage sub-agents
/compact              # Compress context
/clear                # Clear context
/cost                 # Check context usage
/memory               # View loaded CLAUDE.md files
/hooks                # Manage hooks
```

### Beads Commands

```bash
bd ready              # What can I work on?
bd create "title"     # Create new issue
bd update <id>        # Update issue
bd close <id>         # Close issue
bd list               # All issues
bd stats              # Progress overview
```
