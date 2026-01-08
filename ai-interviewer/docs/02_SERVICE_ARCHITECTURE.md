# Service Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              USERS                                          │
│                                │                                            │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        FRONTEND (React)                              │   │
│  │                     Hosted on: Vercel (free)                         │   │
│  │                                                                      │   │
│  │  • Landing Page        • Interview Screen (Chat + Code Editor)      │   │
│  │  • Dashboard           • Feedback Report                             │   │
│  │  • Login/Auth          • History                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                │                                            │
│                                │ HTTPS + WebSocket                          │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     API GATEWAY / LOAD BALANCER                      │   │
│  │                     (Nginx on EC2)                                   │   │
│  │                                                                      │   │
│  │  • SSL Termination    • Rate Limiting    • Request Routing          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                │                                            │
│                ┌───────────────┴───────────────┐                           │
│                │                               │                           │
│                ▼                               ▼                           │
│  ┌──────────────────────────┐    ┌──────────────────────────┐             │
│  │   REST API (Express)     │    │  WebSocket Server        │             │
│  │                          │    │  (Socket.io)             │             │
│  │  /api/auth/*             │    │                          │             │
│  │  /api/users/*            │    │  • interview:message     │             │
│  │  /api/interviews/*       │    │  • interview:response    │             │
│  │  /api/questions/*        │    │  • code:submit           │             │
│  │  /api/feedback/*         │    │  • code:result           │             │
│  │                          │    │  • interview:pause       │             │
│  └────────────┬─────────────┘    └─────────────┬────────────┘             │
│               │                                │                           │
│               └────────────────┬───────────────┘                           │
│                                │                                           │
│                                ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     MAIN BACKEND SERVICE                             │   │
│  │                     (Node.js + Express)                              │   │
│  │                     Hosted on: AWS EC2 t2.micro                      │   │
│  │                                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │                      Core Services                           │    │   │
│  │  ├─────────────────────────────────────────────────────────────┤    │   │
│  │  │  AuthService          │  Google OAuth, JWT tokens           │    │   │
│  │  │  UserService          │  Profile, resume parsing            │    │   │
│  │  │  InterviewService     │  Create, pause, resume, end         │    │   │
│  │  │  QuestionService      │  Adaptive selection algorithm       │    │   │
│  │  │  FeedbackService      │  Generate reports, scores           │    │   │
│  │  │  AnalyticsService     │  Track stats, streaks               │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  │                                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │                      AI Services                             │    │   │
│  │  ├─────────────────────────────────────────────────────────────┤    │   │
│  │  │  AIOrchestrator       │  Routes to appropriate handler      │    │   │
│  │  │  DSAInterviewer       │  Conducts DSA interviews            │    │   │
│  │  │  SystemDesignInt.     │  Conducts SD (Alex Xu style)        │    │   │
│  │  │  FeedbackGenerator    │  Creates detailed feedback          │    │   │
│  │  │  AdaptiveEngine       │  Decides next question difficulty   │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│               │              │                    │                        │
│       ┌───────┘              │                    └──────────┐             │
│       │                      │                               │             │
│       ▼                      ▼                               ▼             │
│  ┌──────────┐    ┌─────────────────────┐         ┌──────────────────┐     │
│  │  Groq    │    │  Code Execution     │         │     Redis        │     │
│  │  API     │    │  Service (Python)   │         │                  │     │
│  │          │    │                     │         │  • Session State │     │
│  │ Llama 3.1│    │  Hosted on: EC2     │         │  • Job Queue     │     │
│  │ Mixtral  │    │  (Docker containers)│         │  • Tab Lock      │     │
│  │          │    │                     │         │  • Rate Limiting │     │
│  └──────────┘    └──────────┬──────────┘         └──────────────────┘     │
│                             │                                              │
│                             ▼                                              │
│                  ┌─────────────────────┐                                   │
│                  │  Docker Sandbox     │                                   │
│                  │                     │                                   │
│                  │  • JS (Node.js)     │                                   │
│                  │  • Python           │                                   │
│                  │  • Java             │                                   │
│                  │                     │                                   │
│                  │  Limits:            │                                   │
│                  │  • 10s timeout      │                                   │
│                  │  • 256MB memory     │                                   │
│                  │  • No network       │                                   │
│                  │  • Read-only FS     │                                   │
│                  └─────────────────────┘                                   │
│                                                                            │
│               ┌────────────────────────────────────────┐                   │
│               │                                        │                   │
│               ▼                                        ▼                   │
│  ┌──────────────────────────┐          ┌──────────────────────────┐       │
│  │      PostgreSQL          │          │         AWS S3           │       │
│  │      (AWS RDS)           │          │                          │       │
│  │                          │          │  • Interview transcripts │       │
│  │  All persistent data     │          │  • Feedback PDFs         │       │
│  │                          │          │  • Resume files          │       │
│  └──────────────────────────┘          └──────────────────────────┘       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Request Flows

### Flow 1: Start DSA Interview

```
User                Frontend            Backend              Redis               DB                 Groq
  │                    │                   │                   │                  │                   │
  │ Click "Start DSA"  │                   │                   │                  │                   │
  │───────────────────▶│                   │                   │                  │                   │
  │                    │ POST /interviews  │                   │                  │                   │
  │                    │──────────────────▶│                   │                  │                   │
  │                    │                   │ Check active      │                  │                   │
  │                    │                   │──────────────────▶│                  │                   │
  │                    │                   │ None active ✓     │                  │                   │
  │                    │                   │◀──────────────────│                  │                   │
  │                    │                   │                   │                  │                   │
  │                    │                   │ Get user profile + select questions │                   │
  │                    │                   │─────────────────────────────────────▶│                   │
  │                    │                   │ Questions selected │                 │                   │
  │                    │                   │◀─────────────────────────────────────│                   │
  │                    │                   │                   │                  │                   │
  │                    │                   │ Create interview  │                  │                   │
  │                    │                   │─────────────────────────────────────▶│                   │
  │                    │                   │ Set active lock   │                  │                   │
  │                    │                   │──────────────────▶│                  │                   │
  │                    │                   │                   │                  │                   │
  │                    │ Interview ID      │                   │                  │                   │
  │                    │◀──────────────────│                   │                  │                   │
  │                    │                   │                   │                  │                   │
  │                    │ Connect WebSocket │                   │                  │                   │
  │                    │──────────────────▶│                   │                  │                   │
  │                    │                   │ Generate intro    │                  │                   │
  │                    │                   │─────────────────────────────────────────────────────────▶│
  │                    │                   │ AI greeting       │                  │                   │
  │                    │                   │◀─────────────────────────────────────────────────────────│
  │                    │ WS: AI message    │                   │                  │                   │
  │ See question       │◀──────────────────│                   │                  │                   │
  │◀───────────────────│                   │                   │                  │                   │
```

### Flow 2: Code Submission

```
User                Frontend            Backend           CodeExec            Redis               DB
  │                    │                   │                  │                  │                  │
  │ Click "Run Code"   │                   │                  │                  │                  │
  │───────────────────▶│                   │                  │                  │                  │
  │                    │ WS: code:submit   │                  │                  │                  │
  │                    │──────────────────▶│                  │                  │                  │
  │                    │                   │ Add to queue     │                  │                  │
  │                    │                   │─────────────────────────────────────▶│                  │
  │                    │                   │                  │                  │                  │
  │                    │ WS: code:running  │                  │                  │                  │
  │ See "Running..."   │◀──────────────────│                  │                  │                  │
  │◀───────────────────│                   │                  │                  │                  │
  │                    │                   │                  │ Process job      │                  │
  │                    │                   │                  │◀─────────────────│                  │
  │                    │                   │                  │                  │                  │
  │                    │                   │                  │ [Docker sandbox] │                  │
  │                    │                   │                  │ Run code         │                  │
  │                    │                   │                  │ Run test cases   │                  │
  │                    │                   │                  │                  │                  │
  │                    │                   │ Results          │                  │                  │
  │                    │                   │◀─────────────────│                  │                  │
  │                    │                   │                  │                  │                  │
  │                    │                   │ Save submission  │                  │                  │
  │                    │                   │────────────────────────────────────────────────────────▶│
  │                    │                   │                  │                  │                  │
  │                    │ WS: code:result   │                  │                  │                  │
  │ See results        │◀──────────────────│                  │                  │                  │
  │◀───────────────────│                   │                  │                  │                  │
```

### Flow 3: Pause & Resume

```
PAUSE:
User clicks "Pause" (between questions) → Backend validates timing →
Save state to DB → Clear active lock in Redis → Set 24h expiry → Redirect to dashboard

RESUME:
User clicks "Resume" → Backend checks expiry (< 24h) → Check no other active →
Load saved state → Restore active lock → Generate recap via Groq →
Continue interview
```

---

## Interview State Machine

```
                         ┌─────────────┐
                         │   CREATED   │
                         └──────┬──────┘
                                │ User joins
                                ▼
                         ┌─────────────┐
              ┌─────────▶│ IN_PROGRESS │◀──────────────┐
              │          └──────┬──────┘               │
              │                 │                      │
              │     ┌───────────┴───────────┐         │
              │     │                       │         │
              │     ▼                       ▼         │
        ┌───────────────┐          ┌─────────────┐    │
        │    PAUSED     │          │ INTERRUPTED │    │
        │ (user action) │          │ (disconnect)│    │
        └───────┬───────┘          └──────┬──────┘    │
                │                         │           │
                │ 24h expires             │ Returns   │
                │ OR abandon              │           │
                ▼                         └───────────┘
         ┌─────────────┐
         │  ABANDONED  │
         └─────────────┘

                         ┌─────────────┐
         All done ──────▶│  COMPLETED  │
                         └─────────────┘
```

---

## Redis Keys

```bash
# Active interview lock
interview:active:{userId} = interviewId          TTL: 4 hours

# Tab lock (heartbeat every 10s)
interview:tab:{interviewId} = tabId              TTL: 30 seconds

# Pause expiry tracker
interview:pause:{interviewId} = expiresAt        TTL: 24 hours

# Rate limiting
ratelimit:interviews:{userId}:{date} = count     TTL: 24 hours

# Quick state access (avoid DB hits)
interview:state:{interviewId} = JSON             TTL: 4 hours
```

---

## AWS Deployment (Free Tier)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           AWS VPC                                    │
│                                                                      │
│   Public Subnet                                                      │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │                    EC2 t2.micro                             │    │
│   │  ┌─────────────────────────────────────────────────────┐   │    │
│   │  │                    Docker                            │   │    │
│   │  │                                                      │   │    │
│   │  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │    │
│   │  │  │   Node.js    │  │   Python     │  │   Redis   │  │   │    │
│   │  │  │   Backend    │  │  CodeExec    │  │           │  │   │    │
│   │  │  └──────────────┘  └──────────────┘  └───────────┘  │   │    │
│   │  │                                                      │   │    │
│   │  └─────────────────────────────────────────────────────┘   │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│   Private Subnet                                                     │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │              RDS PostgreSQL db.t3.micro                     │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

External:
• Vercel (Frontend) - Free
• AWS S3 (Files) - Free tier
• Groq API (LLM) - Free tier
```

---

## Monthly Cost: $0

| Service | Free Tier | Our Usage |
|---------|-----------|-----------|
| EC2 t2.micro | 750 hrs | 720 hrs ✓ |
| RDS db.t3.micro | 750 hrs | 720 hrs ✓ |
| S3 | 5 GB | ~1 GB ✓ |
| Vercel | 100 GB BW | ~10 GB ✓ |
| Groq | Free tier | Limited ✓ |
