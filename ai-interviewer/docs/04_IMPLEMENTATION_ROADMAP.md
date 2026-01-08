# Implementation Roadmap

## Overview

This document breaks down the entire project into manageable phases. Each phase:
- Has clear deliverables
- Is independently testable
- Builds on the previous phase
- Can be handed to Claude Code as isolated tasks

---

## Feature Breakdown by Priority

### Priority 1: MVP Core (Must Have for Launch)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MVP FEATURES                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AUTHENTICATION                                                             │
│  ├── F1.1: Google OAuth login                                              │
│  ├── F1.2: JWT access token (15 min expiry)                                │
│  ├── F1.3: Refresh token (HTTP-only cookie, 7 days)                        │
│  ├── F1.4: Logout (clear tokens)                                           │
│  └── F1.5: Protected route middleware                                      │
│                                                                             │
│  USER MANAGEMENT                                                            │
│  ├── F2.1: Auto-create user on first login                                 │
│  ├── F2.2: View own profile                                                │
│  ├── F2.3: Update profile (name, target role, experience)                  │
│  └── F2.4: Select preferred programming language                           │
│                                                                             │
│  DSA INTERVIEW (Basic)                                                      │
│  ├── F3.1: Start new DSA interview (select difficulty)                     │
│  ├── F3.2: Load question and display problem statement                     │
│  ├── F3.3: Chat with AI interviewer                                        │
│  ├── F3.4: Code editor with syntax highlighting                            │
│  ├── F3.5: Run code (execute against sample test cases)                    │
│  ├── F3.6: Submit code (execute against all test cases)                    │
│  ├── F3.7: View test results (pass/fail per case)                          │
│  ├── F3.8: Move to next question                                           │
│  ├── F3.9: End interview                                                   │
│  └── F3.10: Basic feedback (score + AI summary)                            │
│                                                                             │
│  DASHBOARD                                                                  │
│  ├── F4.1: View interview history (list)                                   │
│  ├── F4.2: View single interview details                                   │
│  └── F4.3: See basic stats (total interviews, avg score)                   │
│                                                                             │
│  QUESTION BANK                                                              │
│  ├── F5.1: Seed 20 DSA questions (Easy/Medium/Hard)                        │
│  ├── F5.2: Random question selection by difficulty                         │
│  └── F5.3: Test cases for each question                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Priority 2: Core Features (Complete Product)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CORE FEATURES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SYSTEM DESIGN INTERVIEW                                                    │
│  ├── F6.1: Start System Design interview                                   │
│  ├── F6.2: Phase-based flow (Requirements → Design → Deep Dive → Scale)    │
│  ├── F6.3: MCQ questions with explanations                                 │
│  ├── F6.4: Scenario-based questions                                        │
│  ├── F6.5: AI evaluation based on Alex Xu rubric                           │
│  └── F6.6: System Design specific feedback                                 │
│                                                                             │
│  PAUSE/RESUME                                                               │
│  ├── F7.1: Pause interview (between questions only)                        │
│  ├── F7.2: Save interview state                                            │
│  ├── F7.3: Resume within 24 hours                                          │
│  ├── F7.4: AI recap on resume                                              │
│  └── F7.5: Auto-expire after 24 hours                                      │
│                                                                             │
│  ADAPTIVE DIFFICULTY                                                        │
│  ├── F8.1: Track performance per question                                  │
│  ├── F8.2: Adjust next question difficulty based on score                  │
│  ├── F8.3: Topic-based selection (cover weak areas)                        │
│  └── F8.4: Don't repeat recently asked questions                           │
│                                                                             │
│  ENHANCED FEEDBACK                                                          │
│  ├── F9.1: Detailed scoring breakdown                                      │
│  ├── F9.2: Per-question feedback                                           │
│  ├── F9.3: Strengths and improvements list                                 │
│  ├── F9.4: Recommended study topics                                        │
│  └── F9.5: Show optimal solution (if scored low)                           │
│                                                                             │
│  CONCURRENCY CONTROLS                                                       │
│  ├── F10.1: One active interview per user                                  │
│  ├── F10.2: Block second tab (same interview)                              │
│  ├── F10.3: Handle disconnection gracefully                                │
│  └── F10.4: Auto-save on connection loss                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Priority 3: Enhanced Features (Polish)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENHANCED FEATURES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESUME INTEGRATION                                                         │
│  ├── F11.1: Upload resume (PDF)                                            │
│  ├── F11.2: Parse resume (extract skills, experience)                      │
│  ├── F11.3: Store parsed data in profile                                   │
│  └── F11.4: Use resume data for question selection                         │
│                                                                             │
│  ANALYTICS DASHBOARD                                                        │
│  ├── F12.1: Progress chart over time                                       │
│  ├── F12.2: Topic-wise performance breakdown                               │
│  ├── F12.3: Streak tracking                                                │
│  ├── F12.4: Comparison with average                                        │
│  └── F12.5: Weak areas identification                                      │
│                                                                             │
│  HINTS SYSTEM                                                               │
│  ├── F13.1: Request hint during question                                   │
│  ├── F13.2: Progressive hints (3 levels)                                   │
│  └── F13.3: Hints affect final score                                       │
│                                                                             │
│  INTERVIEW CONFIGURATION                                                    │
│  ├── F14.1: Select specific topics                                         │
│  ├── F14.2: Set number of questions                                        │
│  ├── F14.3: Set time limit (optional)                                      │
│  └── F14.4: Target company selection                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Priority 4: Scale & Production (Future)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SCALE FEATURES                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRODUCTION HARDENING                                                       │
│  ├── F15.1: Rate limiting                                                  │
│  ├── F15.2: Request validation                                             │
│  ├── F15.3: Error tracking (Sentry)                                        │
│  ├── F15.4: Logging (CloudWatch)                                           │
│  └── F15.5: Health checks                                                  │
│                                                                             │
│  PERFORMANCE                                                                │
│  ├── F16.1: Redis caching for questions                                    │
│  ├── F16.2: Connection pooling                                             │
│  ├── F16.3: Response compression                                           │
│  └── F16.4: CDN for static assets                                          │
│                                                                             │
│  DEPLOYMENT                                                                 │
│  ├── F17.1: Docker production builds                                       │
│  ├── F17.2: CI/CD pipeline                                                 │
│  ├── F17.3: Environment management                                         │
│  └── F17.4: Database migrations                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  PHASE 0          PHASE 1          PHASE 2          PHASE 3                │
│  Setup            MVP              Core             Production              │
│  (Week 1)         (Weeks 2-4)      (Weeks 5-8)      (Weeks 9-12)           │
│                                                                             │
│  ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐           │
│  │ Project │      │  Auth   │      │ System  │      │  AWS    │           │
│  │ Setup   │─────▶│  + DSA  │─────▶│ Design  │─────▶│ Deploy  │           │
│  │ + Dev   │      │  MVP    │      │ + Pause │      │ + Scale │           │
│  │ Env     │      │         │      │ + Adapt │      │         │           │
│  └─────────┘      └─────────┘      └─────────┘      └─────────┘           │
│                                                                             │
│  Deliverables:    Deliverables:    Deliverables:    Deliverables:         │
│  • Repo setup     • Login works    • SD interviews  • Live on AWS         │
│  • Docker works   • DSA interview  • Pause/Resume   • CI/CD works         │
│  • DB running     • Code runs      • Adaptive algo  • Monitoring          │
│  • Basic API      • Feedback       • Analytics      • Documentation       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Phase Breakdown

### PHASE 0: Project Setup (Week 1)

**Goal**: Development environment ready, can run empty app

#### Phase 0.1: Repository & Structure (Day 1)

```
Tasks:
├── Create GitHub repository
├── Initialize monorepo structure
├── Setup package.json (root + packages)
├── Configure TypeScript
├── Setup ESLint + Prettier
├── Create .gitignore
├── Create README.md
└── First commit

Test: 
✓ Can clone repo
✓ npm install works
✓ No lint errors
```

#### Phase 0.2: Backend Skeleton (Day 2)

```
Tasks:
├── Create Express server
├── Setup TypeScript compilation
├── Add health check endpoint (GET /health)
├── Setup environment variables (.env)
├── Add nodemon for dev
└── Test with curl/Postman

Test:
✓ npm run dev starts server
✓ GET http://localhost:3000/health returns { status: "ok" }
```

#### Phase 0.3: Database Setup (Day 3)

```
Tasks:
├── Create docker-compose.yml
│   ├── PostgreSQL service
│   └── Redis service
├── Setup Prisma
├── Create initial schema (just User model)
├── Run first migration
└── Test database connection

Test:
✓ docker-compose up starts DB
✓ npx prisma migrate dev works
✓ Can connect from Node.js
✓ Can create a test user via Prisma Studio
```

#### Phase 0.4: Frontend Skeleton (Day 4)

```
Tasks:
├── Create React app with Vite
├── Setup TypeScript
├── Add TailwindCSS
├── Create basic layout component
├── Add React Router
├── Create placeholder pages (Home, Login, Dashboard)
└── Proxy API requests to backend

Test:
✓ npm run dev starts frontend
✓ Can see home page at localhost:5173
✓ Navigation between pages works
✓ API proxy works (calls to /api/* go to backend)
```

#### Phase 0.5: Code Executor Setup (Day 5)

```
Tasks:
├── Create Python FastAPI service
├── Setup Docker SDK
├── Create /execute endpoint (placeholder)
├── Add to docker-compose.yml
├── Test communication from Node.js backend
└── Create sandbox Dockerfiles (JS, Python, Java)

Test:
✓ FastAPI runs on port 8000
✓ POST /execute returns mock result
✓ Backend can call code executor
✓ Sandbox containers can be built
```

#### Phase 0.6: Integration Test (Day 6-7)

```
Tasks:
├── Start all services with docker-compose
├── Frontend → Backend → Database flow works
├── Backend → Code Executor flow works
├── Document setup process
└── Create scripts (start-dev.sh, reset-db.sh)

Test:
✓ Single command starts everything
✓ Frontend can fetch from backend
✓ Backend can query database
✓ Backend can execute code
```

---

### PHASE 1: MVP (Weeks 2-4)

**Goal**: Complete DSA interview flow, end-to-end

#### Phase 1.1: Authentication (Week 2, Days 1-3)

```
Tasks:
├── Setup Google OAuth credentials
├── Install Passport.js
├── Create auth routes
│   ├── GET /api/auth/google (redirect to Google)
│   ├── GET /api/auth/google/callback (handle response)
│   ├── POST /api/auth/refresh (refresh token)
│   └── POST /api/auth/logout
├── Generate JWT tokens
├── Create auth middleware
├── Store user in database on first login
├── Frontend: Login button
├── Frontend: Auth context/store
├── Frontend: Protected route component
└── Frontend: Show user info in header

Test:
✓ Click login → redirects to Google
✓ After Google login → redirected to dashboard
✓ JWT stored in cookie
✓ Protected routes redirect to login if not authenticated
✓ Refresh token works
✓ Logout clears session
```

#### Phase 1.2: User Profile (Week 2, Days 4-5)

```
Tasks:
├── Create user_profiles table migration
├── API endpoints
│   ├── GET /api/users/me
│   ├── PATCH /api/users/me
│   └── GET /api/users/me/profile
├── Frontend: Profile page
├── Frontend: Edit profile form
└── Frontend: Language selector

Test:
✓ Can view own profile
✓ Can update name, experience, target role
✓ Can select preferred language
✓ Changes persist after refresh
```

#### Phase 1.3: Question Bank (Week 2, Days 6-7)

```
Tasks:
├── Create questions table migration
├── Create question_test_cases table migration
├── Seed script with 20 DSA questions
│   ├── 7 Easy (Arrays, Strings, Basic)
│   ├── 8 Medium (HashMap, Two Pointers, Binary Search)
│   └── 5 Hard (DP, Graphs, Trees)
├── API endpoint
│   └── GET /api/questions/random?difficulty=MEDIUM
└── Each question has 5-10 test cases

Test:
✓ Seed script populates questions
✓ Can fetch random question by difficulty
✓ Test cases are included with question
```

#### Phase 1.4: Interview CRUD (Week 3, Days 1-2)

```
Tasks:
├── Create interviews table migration
├── Create rounds table migration
├── API endpoints
│   ├── POST /api/interviews (create new)
│   ├── GET /api/interviews (list user's interviews)
│   ├── GET /api/interviews/:id (get details)
│   └── POST /api/interviews/:id/start
├── Service: Create interview with 3 rounds
├── Service: Select questions based on difficulty
└── Frontend: Start interview button

Test:
✓ Can create new DSA interview
✓ Interview has 3 rounds with questions
✓ Can list past interviews
✓ Can view interview details
```

#### Phase 1.5: WebSocket Setup (Week 3, Days 3-4)

```
Tasks:
├── Add Socket.io to backend
├── Authenticate WebSocket connections
├── Create interview room logic
│   ├── Join room: interview:{id}
│   ├── Event: interview:message (user sends)
│   └── Event: interview:response (AI responds)
├── Frontend: Socket.io client
├── Frontend: useWebSocket hook
└── Frontend: Connection status indicator

Test:
✓ WebSocket connects with valid JWT
✓ Rejects connection without auth
✓ Can join interview room
✓ Messages are received in real-time
```

#### Phase 1.6: AI Integration (Week 3, Days 5-7)

```
Tasks:
├── Setup Groq API client
├── Create DSA interviewer prompt
├── Service: Generate AI response
│   ├── System prompt (interviewer persona)
│   ├── Include question context
│   ├── Include conversation history
│   └── Stream response via WebSocket
├── Handle AI errors gracefully
└── Frontend: Display streaming response

Test:
✓ AI responds to user messages
✓ Responses are contextual (knows the question)
✓ Conversation history is maintained
✓ Errors show user-friendly message
```

#### Phase 1.7: Code Editor (Week 4, Days 1-2)

```
Tasks:
├── Add Monaco Editor to frontend
├── Language selector (JS, Python, Java)
├── Syntax highlighting
├── Basic autocomplete
├── Editor state management
└── Connect to interview context

Test:
✓ Can write code in editor
✓ Can switch languages
✓ Syntax highlighting works
✓ Code persists during interview
```

#### Phase 1.8: Code Execution (Week 4, Days 3-4)

```
Tasks:
├── Implement sandbox execution
│   ├── Create container with code
│   ├── Set resource limits
│   ├── Capture stdout/stderr
│   ├── Handle timeout
│   └── Cleanup container
├── API: POST /api/code/run (sample tests)
├── API: POST /api/code/submit (all tests)
├── WebSocket events: code:submit, code:result
├── Frontend: Run button
├── Frontend: Submit button
└── Frontend: Display results

Test:
✓ Can run code against sample tests
✓ Can submit code against all tests
✓ Timeout is enforced (10s)
✓ Memory limit is enforced
✓ Malicious code is sandboxed
✓ Results show pass/fail per test
```

#### Phase 1.9: Interview Flow (Week 4, Days 5-6)

```
Tasks:
├── Complete interview state machine
├── Round transitions
│   ├── Complete round → AI feedback
│   ├── Move to next question
│   └── End interview after all rounds
├── Service: Calculate score per round
├── Service: Generate final feedback
├── Frontend: Question navigation
├── Frontend: End interview button
└── Frontend: Feedback display

Test:
✓ Can complete full 3-question interview
✓ Scores calculated per round
✓ Can move between questions
✓ Interview ends properly
✓ Feedback is generated and saved
```

#### Phase 1.10: Dashboard (Week 4, Day 7)

```
Tasks:
├── Dashboard page
│   ├── Start new interview button
│   ├── Interview history list
│   └── Basic stats (count, avg score)
├── Interview detail page
│   ├── Questions and answers
│   ├── Scores
│   └── Feedback
└── Navigation updates

Test:
✓ Dashboard shows interview history
✓ Can click to view details
✓ Stats are calculated correctly
✓ Can start new interview from dashboard
```

---

### PHASE 2: Core Features (Weeks 5-8)

**Goal**: System Design interviews, Pause/Resume, Adaptive difficulty

#### Phase 2.1: System Design Questions (Week 5, Days 1-3)

```
Tasks:
├── Add question_options table
├── Add scenario_responses table
├── Create 15 SD questions
│   ├── 5 MCQ questions
│   ├── 5 Scenario questions
│   └── 5 Open-ended questions
├── API: Fetch SD questions
└── Seed script for SD questions

Test:
✓ SD questions seeded
✓ MCQ options load correctly
✓ Scenario questions have rubrics
```

#### Phase 2.2: System Design Interview Flow (Week 5, Days 4-7)

```
Tasks:
├── SD interviewer prompt (Alex Xu style)
├── Phase-based flow
│   ├── Phase 1: Requirements (5 min)
│   ├── Phase 2: High-Level Design (10 min)
│   ├── Phase 3: Deep Dive (15 min)
│   └── Phase 4: Scale & Wrap-up (10 min)
├── MCQ handling in chat
├── Scenario evaluation
├── Frontend: Phase indicator
├── Frontend: MCQ component
└── Frontend: Timer (pauseable for SD)

Test:
✓ Can start SD interview
✓ AI guides through phases
✓ MCQ answers recorded
✓ Scenarios evaluated
✓ Timer pauses correctly for SD
```

#### Phase 2.3: Pause/Resume (Week 6, Days 1-4)

```
Tasks:
├── Update interview status enum
├── Redis: pause expiry tracking
├── API: POST /api/interviews/:id/pause
├── API: POST /api/interviews/:id/resume
├── Service: Save state on pause
├── Service: Load state on resume
├── Service: Generate recap
├── Service: Expire after 24h (cron job)
├── Frontend: Pause button
├── Frontend: Resume from dashboard
└── Frontend: Show paused interviews

Test:
✓ Can pause between questions
✓ Cannot pause mid-question
✓ Resume loads previous state
✓ AI provides recap
✓ Paused interview blocks new interview
✓ Expires after 24 hours
```

#### Phase 2.4: Concurrency Controls (Week 6, Days 5-7)

```
Tasks:
├── Redis: active interview lock
├── Redis: tab lock with heartbeat
├── Middleware: check active interview
├── WebSocket: tab detection
├── Auto-pause on disconnect
├── Frontend: heartbeat ping
├── Frontend: "Interview in progress" modal
└── Frontend: "Open in another tab" error

Test:
✓ Cannot start interview if one is active
✓ Cannot start if one is paused (must resume/abandon)
✓ Second tab shows error
✓ Disconnect → auto-pause after timeout
```

#### Phase 2.5: Adaptive Difficulty (Week 7, Days 1-4)

```
Tasks:
├── Update user_profiles (strong/weak topics)
├── Service: Calculate difficulty adjustment
│   ├── Score ≥ 85% → increase difficulty
│   ├── Score ≤ 50% → decrease difficulty
│   └── Otherwise → same difficulty
├── Service: Topic-based selection
│   ├── Track topics asked
│   ├── Prioritize weak topics (30%)
│   ├── Mix strong topics (30%)
│   └── New topics (40%)
├── Service: Avoid recent questions (7 days)
├── Update question selection on interview start
└── Update user profile after interview

Test:
✓ High score → harder next question
✓ Low score → easier next question
✓ Topics are balanced
✓ Recent questions not repeated
✓ Profile updated with performance
```

#### Phase 2.6: Enhanced Feedback (Week 7, Days 5-7)

```
Tasks:
├── Detailed feedback prompt
├── Per-question breakdown
├── Strengths/improvements extraction
├── Study topics recommendation
├── Show optimal solution (score < 60%)
├── Frontend: Enhanced feedback page
├── Frontend: Score breakdown chart
└── Frontend: Recommended topics

Test:
✓ Feedback has detailed breakdown
✓ Strengths and improvements listed
✓ Study topics relevant to weak areas
✓ Optimal solution shown when needed
```

#### Phase 2.7: Hints System (Week 8, Days 1-3)

```
Tasks:
├── API: POST /api/interviews/:id/rounds/:roundId/hint
├── Progressive hints (level 1, 2, 3)
├── Track hints used per round
├── Score penalty for hints
├── Frontend: Hint button
├── Frontend: Hint display
└── Frontend: Hints used indicator

Test:
✓ Can request hint
✓ Hints are progressive
✓ Cannot exceed 3 hints
✓ Score reflects hint usage
```

#### Phase 2.8: Analytics Dashboard (Week 8, Days 4-7)

```
Tasks:
├── Create user_daily_stats table
├── Service: Update stats after interview
├── Service: Calculate streak
├── API: GET /api/analytics/dashboard
├── API: GET /api/analytics/progress
├── Frontend: Stats cards
├── Frontend: Progress chart
├── Frontend: Topic performance
└── Frontend: Streak display

Test:
✓ Stats update after interview
✓ Streak calculated correctly
✓ Charts display correctly
✓ Topic breakdown accurate
```

---

### PHASE 3: Production (Weeks 9-12)

**Goal**: Deploy to AWS, CI/CD, monitoring, polish

#### Phase 3.1: Resume Upload (Week 9, Days 1-3)

```
Tasks:
├── Setup AWS S3 bucket
├── API: POST /api/users/me/resume
├── Service: Upload to S3
├── Service: Parse resume (basic extraction)
├── Store parsed data in profile
├── Frontend: Resume upload
└── Frontend: Parsed skills display

Test:
✓ Can upload PDF
✓ Stored in S3
✓ Skills extracted
✓ Profile updated
```

#### Phase 3.2: Docker Production Build (Week 9, Days 4-7)

```
Tasks:
├── Multi-stage Dockerfile (backend)
├── Multi-stage Dockerfile (frontend)
├── Production docker-compose
├── Environment variable management
├── Health check endpoints
└── Graceful shutdown handling

Test:
✓ Production build succeeds
✓ Containers start correctly
✓ Health checks pass
✓ Graceful shutdown works
```

#### Phase 3.3: AWS Infrastructure (Week 10, Days 1-4)

```
Tasks:
├── Setup AWS account
├── Create VPC
├── Create RDS PostgreSQL
├── Create EC2 instance
├── Setup security groups
├── Install Docker on EC2
├── Configure Nginx
├── Setup SSL certificate
└── Point domain (optional)

Test:
✓ Can SSH into EC2
✓ Can connect to RDS
✓ Nginx proxies requests
✓ HTTPS works
```

#### Phase 3.4: CI/CD Pipeline (Week 10, Days 5-7)

```
Tasks:
├── GitHub Actions workflow
│   ├── Lint on PR
│   ├── Test on PR
│   ├── Build Docker images
│   ├── Push to ECR
│   └── Deploy to EC2
├── Environment secrets in GitHub
├── Deployment scripts
└── Rollback procedure

Test:
✓ PR triggers lint/test
✓ Merge to main triggers deploy
✓ Deployment succeeds
✓ Can rollback if needed
```

#### Phase 3.5: Monitoring & Logging (Week 11, Days 1-4)

```
Tasks:
├── CloudWatch log groups
├── Application logging (Winston)
├── Error tracking (Sentry free tier)
├── Basic metrics endpoint
├── Uptime monitoring (UptimeRobot free)
└── Alerting on errors

Test:
✓ Logs appear in CloudWatch
✓ Errors reported to Sentry
✓ Uptime alerts work
```

#### Phase 3.6: Security Hardening (Week 11, Days 5-7)

```
Tasks:
├── Rate limiting (express-rate-limit)
├── Input validation (Zod)
├── Helmet security headers
├── CORS configuration
├── SQL injection prevention (Prisma)
├── XSS prevention
└── Security audit checklist

Test:
✓ Rate limiting blocks abuse
✓ Invalid input rejected
✓ Security headers present
✓ CORS blocks unauthorized origins
```

#### Phase 3.7: Performance Optimization (Week 12, Days 1-3)

```
Tasks:
├── Redis caching for questions
├── Database query optimization
├── Response compression
├── Frontend bundle optimization
├── Lazy loading
└── Image optimization

Test:
✓ Question fetch is cached
✓ Queries under 100ms
✓ Bundle size reasonable
✓ Lighthouse score > 80
```

#### Phase 3.8: Documentation & Launch (Week 12, Days 4-7)

```
Tasks:
├── API documentation
├── Setup guide
├── User guide
├── Architecture documentation
├── Contributing guide
├── Final testing
└── Launch!

Test:
✓ New developer can setup in 30 min
✓ All features work in production
✓ Documentation is complete
```
