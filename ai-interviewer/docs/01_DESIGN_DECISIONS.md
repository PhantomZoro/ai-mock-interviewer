# AI Mock Interviewer - Design Decisions

## Finalized Decisions

### 1. Interview State & Resume
| Decision | Choice |
|----------|--------|
| Paused interview validity | 24 hours |
| Resume behavior | AI briefly recaps before continuing |
| Timer on pause | DSA: continues, System Design: pauses |
| When can user pause | Only between questions/rounds, not mid-question |

### 2. Adaptive Question Selection
| Decision | Choice |
|----------|--------|
| Resume signals used | Experience years, skills, past companies, target role |
| Difficulty progression | Increases with caps at each level (standard adaptive) |
| Topic coverage | Mix of strong/weak areas for accurate assessment |
| System Design evaluation | Based on Alex Xu's interview guidelines |
| Poor performance handling | Move on, note in feedback, use data for future sessions |

### 3. Concurrency
| Decision | Choice |
|----------|--------|
| Multiple active interviews | Blocked - "You have an interview in progress" |
| Paused + new interview | Must resume or abandon paused first |
| Same interview in two tabs | Second tab shows error |

### 4. Code Execution
| Decision | Choice |
|----------|--------|
| Supported languages | JavaScript, Python, Java |
| Time limit | 10 seconds |
| Memory limit | 256MB |
| Hidden test cases | Show only if user fails them |
| Run attempts | Unlimited with sample test cases |
| Service down behavior | Show error, let user retry |

### 5. Real-Time Communication
| Decision | Choice |
|----------|--------|
| Connection loss handling | Auto-save after X minutes, mark as interrupted |
| AI waiting behavior | Passive wait, no proactive prompts |
| Typing indicator | No (keeps it snappier) |
| LLM context | Summarized context to save tokens |

### 6. System Design Interview Format
| Decision | Choice |
|----------|--------|
| Format | Conversational + MCQ + Scenario-based (NO diagrams) |
| Phase transitions | Strictly enforced by AI |
| Evaluation standard | Alex Xu's System Design Interview guidelines |

### 7. Scoring & Feedback
| Decision | Choice |
|----------|--------|
| DSA scoring | Test cases (objective) + AI evaluation (approach, code quality) |
| System Design scoring | AI-based with rubric from Alex Xu guidelines |
| When to show scores | At the end of interview (realistic) |
| Show correct solution | Only if scored below threshold |

---

## Tech Stack (Updated)

### Removed
- ~~Excalidraw~~ (System Design is conversation-based)

### Final Stack
```
FRONTEND
├── React 18 + TypeScript
├── TailwindCSS
├── Zustand (state)
├── Monaco Editor (code editor for DSA)
└── Socket.io Client

BACKEND (Node.js)
├── Express.js + TypeScript
├── Socket.io
├── Prisma ORM
├── Passport.js (Google OAuth)
└── Bull (job queue with Redis)

BACKEND (Python) - Code Execution Microservice
├── FastAPI
└── Docker SDK (sandboxed execution)

AI
└── Groq API (Llama 3.1 / Mixtral)

DATABASE
├── PostgreSQL (AWS RDS free tier)
└── Redis (session state, job queue)

AWS (Free Tier)
├── EC2 t2.micro (backend)
├── RDS PostgreSQL
├── S3 (transcripts, reports)
├── CloudWatch (logs)
└── ECR (Docker images)
```

---

## Updated Data Model Changes

### Removed
- `diagrams` table (no longer needed)

### Added
- `system_design_responses` table (for MCQ and scenario answers)

### Modified
- `questions` table: Added `question_format` field for MCQ support
- `rounds` table: Works for both DSA and System Design
