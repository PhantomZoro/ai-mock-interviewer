# AI Mock Interviewer

AI-powered mock interview platform for DSA and System Design practice.

---

## 🚀 Quick Start

### If you're starting fresh:

1. **Install Software** → Read `docs/00_SOFTWARE_SETUP.md`
2. **Create GitHub Repo** → Clone to your machine
3. **Copy Project Files** → Copy this entire folder structure
4. **Install Beads** → `npm install -g @beads/bd`
5. **Start Claude Code** → `cd ai-mock-interviewer && claude`
6. **Begin Building** → `/start-session`

### If software is already installed:

```bash
cd ai-mock-interviewer
claude                    # Start Claude Code
/start-session            # See available tasks
```

---

## 📁 Documentation Index

Read these in order for full understanding:

| # | Document | Purpose | When to Read |
|---|----------|---------|--------------|
| 00 | [SOFTWARE_SETUP.md](docs/00_SOFTWARE_SETUP.md) | Install Node.js, Docker, Python, etc. | **First** - before anything else |
| 01 | [DESIGN_DECISIONS.md](docs/01_DESIGN_DECISIONS.md) | Architecture choices made | Understanding the "why" |
| 02 | [SERVICE_ARCHITECTURE.md](docs/02_SERVICE_ARCHITECTURE.md) | System design, request flows | Understanding the system |
| 03 | [DATA_MODEL.md](docs/03_DATA_MODEL.md) | Complete database schema | When working with data |
| 04 | [IMPLEMENTATION_ROADMAP.md](docs/04_IMPLEMENTATION_ROADMAP.md) | Phase breakdown, features | Planning work |
| 05 | [ENVIRONMENT_SETUP.md](docs/05_ENVIRONMENT_SETUP.md) | Env vars, Docker configs | Setting up project |
| 06 | [CLAUDE_CODE_TASKS.md](docs/06_CLAUDE_CODE_TASKS.md) | Task prompts for Claude | Reference during building |
| 07 | [AGENTIC_DEVELOPMENT.md](docs/07_AGENTIC_DEVELOPMENT.md) | Sub-agents, Beads, workflow | **Must read** for workflow |
| -- | [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) | Cheatsheet | Print & keep handy |

---

## 📂 Project Structure

```
ai-mock-interviewer/
│
├── 📄 CLAUDE.md                    # Claude Code project config
├── 📄 README.md                    # This file
│
├── 📁 .claude/                     # Claude Code configuration
│   ├── 📁 agents/                  # Sub-agent definitions
│   │   ├── plan-reviewer.md        # Reviews architecture plans
│   │   ├── code-reviewer.md        # Reviews code for bugs
│   │   ├── test-writer.md          # Generates tests
│   │   └── security-auditor.md     # Security checks
│   ├── 📁 commands/                # Slash commands
│   │   ├── start-session.md        # /start-session
│   │   ├── land-the-plane.md       # /land-the-plane
│   │   ├── new-feature.md          # /new-feature
│   │   ├── code-review.md          # /code-review
│   │   └── fix-issue.md            # /fix-issue
│   └── 📄 settings.json            # Hooks & permissions
│
├── 📁 .beads/                      # Task tracking (created by bd init)
│
├── 📁 docs/                        # All documentation
│   ├── 00_SOFTWARE_SETUP.md
│   ├── 01_DESIGN_DECISIONS.md
│   ├── 02_SERVICE_ARCHITECTURE.md
│   ├── 03_DATA_MODEL.md
│   ├── 04_IMPLEMENTATION_ROADMAP.md
│   ├── 05_ENVIRONMENT_SETUP.md
│   ├── 06_CLAUDE_CODE_TASKS.md
│   ├── 07_AGENTIC_DEVELOPMENT.md
│   └── QUICK_REFERENCE.md
│
├── 📁 apps/                        # Applications (created during Phase 0)
│   ├── 📁 api/                     # Express backend
│   ├── 📁 web/                     # React frontend
│   └── 📁 code-executor/           # Python sandbox
│
├── 📁 docker/                      # Docker configurations
│
└── 📁 packages/                    # Shared code
    └── 📁 shared/                  # Shared types
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, TailwindCSS, Zustand, Monaco Editor |
| **Backend** | Node.js, Express, TypeScript, Socket.io, Prisma |
| **Database** | PostgreSQL, Redis |
| **AI** | Groq API (Llama 3.1, Mixtral) |
| **Code Execution** | Python FastAPI, Docker sandbox |
| **Deployment** | AWS (EC2, RDS, S3), Vercel |

---

## 🎯 Development Workflow

### Daily Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. /start-session        → Pick a task from Beads              │
│                                                                 │
│  2. [Shift+Tab+Tab]       → Plan mode for complex features      │
│                                                                 │
│  3. Build the feature     → Write code                          │
│                                                                 │
│  4. "Run code-reviewer"   → Get review in fresh context         │
│                                                                 │
│  5. /land-the-plane       → Test, lint, commit, push            │
│                                                                 │
│  6. Repeat                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Commands

| Command | Action |
|---------|--------|
| `/start-session` | Begin work, see available tasks |
| `/new-feature X` | Plan a new feature with review |
| `/code-review` | Review recent changes |
| `/land-the-plane` | End session properly |
| `bd ready` | See tasks ready to work on |
| `bd create "X"` | Create new task |
| `bd close <id>` | Mark task complete |

---

## 📋 Implementation Phases

| Phase | Focus | Duration |
|-------|-------|----------|
| **Phase 0** | Project Setup | Week 1 |
| **Phase 1** | MVP (Auth, DSA Interview, Dashboard) | Weeks 2-4 |
| **Phase 2** | Core Features (System Design, Pause/Resume) | Weeks 5-8 |
| **Phase 3** | Production (AWS Deploy, Monitoring) | Weeks 9-12 |

---

## ⚡ Getting Started Step by Step

### Step 1: Install Software
Follow `docs/00_SOFTWARE_SETUP.md` to install:
- Node.js 18 (via nvm-windows)
- Docker Desktop
- Python 3.11+
- Git + Git Bash
- VS Code
- pnpm

### Step 2: Setup External Services
- Create Google Cloud project for OAuth
- Get Groq API key
- Create GitHub repository

### Step 3: Clone and Setup
```bash
git clone git@github.com:YOUR_USERNAME/ai-mock-interviewer.git
cd ai-mock-interviewer
npm install -g @beads/bd
bd init
```

### Step 4: Create Environment File
```bash
# .env
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GROQ_API_KEY=gsk_your_key
JWT_SECRET=random_32_char_string
JWT_REFRESH_SECRET=another_random_string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_interviewer_dev
REDIS_URL=redis://localhost:6379
```

### Step 5: Start Building
```bash
claude                    # Start Claude Code
/start-session            # See first tasks
```

---

## 📞 Services (Development)

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:3000 | 3000 |
| Code Executor | http://localhost:8000 | 8000 |
| PostgreSQL | localhost | 5432 |
| Redis | localhost | 6379 |
| Prisma Studio | http://localhost:5555 | 5555 |

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Groq API Documentation](https://console.groq.com/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Claude Code Documentation](https://code.claude.com/docs)
