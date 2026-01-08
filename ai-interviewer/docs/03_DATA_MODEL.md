# Data Model (Updated)

## Changes from Previous Version

| Change | Reason |
|--------|--------|
| Removed `diagrams` table | System Design is now conversation + MCQ based |
| Added `question_options` table | For MCQ questions in System Design |
| Added `scenario_responses` | Track user's choices in scenario questions |
| Modified `questions` table | Added `format` field (OPEN_ENDED, MCQ, SCENARIO) |

---

## Entity Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   users ─────────────┬─────────────────────────────────────────────────────┐ │
│     │                │                                                     │ │
│     │ 1:1            │ 1:N                                                 │ │
│     ▼                ▼                                                     │ │
│   user_profiles    interviews ─────────────────────────┐                   │ │
│                      │                                 │                   │ │
│                      │ 1:1                             │ 1:N               │ │
│                      ▼                                 ▼                   │ │
│                    interview_feedback                rounds               │ │
│                                                        │                   │ │
│                                     ┌──────────────────┼──────────────────┐│ │
│                                     │                  │                  ││ │
│                                     │ 1:N              │ N:1              ││ │
│                                     ▼                  ▼                  ││ │
│                                   messages          questions            ││ │
│                                                        │                  ││ │
│                                                        │ 1:N              ││ │
│                                                        ▼                  ││ │
│                                                  question_options        ││ │
│                                                  (for MCQ)               ││ │
│                                                                          ││ │
│                             ┌────────────────────────────────────────────┘│ │
│                             │                                             │ │
│                             │ 1:N (DSA only)        1:N (SD MCQ only)     │ │
│                             ▼                       ▼                     │ │
│                         code_submissions        scenario_responses        │ │
│                                                                            │ │
│   users ──── 1:N ──── user_daily_stats                                    │ │
│                                                                            │ │
│   questions ──── 1:N ──── question_test_cases (DSA only)                  │ │
│                                                                            │ │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Complete Schema

### USERS

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ users                                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ id                 UUID        PRIMARY KEY, DEFAULT uuid_generate_v4()  │
│ email              VARCHAR(255) UNIQUE NOT NULL                         │
│ name               VARCHAR(255) NOT NULL                                │
│ avatar_url         VARCHAR(500) NULL                                    │
│ google_id          VARCHAR(255) UNIQUE NOT NULL                         │
│ created_at         TIMESTAMPTZ  DEFAULT NOW()                           │
│ updated_at         TIMESTAMPTZ  DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEXES:                                                                │
│   • idx_users_email ON (email)                                          │
│   • idx_users_google_id ON (google_id)                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ user_profiles                                                            │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ user_id             UUID        UNIQUE, FK → users.id ON DELETE CASCADE │
│ experience_years    INT         NULL (0-50)                             │
│ target_role         VARCHAR(100) NULL                                   │
│ target_company      VARCHAR(100) NULL                                   │
│ preferred_language  VARCHAR(20)  DEFAULT 'javascript'                   │
│ skills              TEXT[]       DEFAULT '{}'                           │
│ weak_topics         TEXT[]       DEFAULT '{}' (learned over time)       │
│ strong_topics       TEXT[]       DEFAULT '{}' (learned over time)       │
│ resume_url          VARCHAR(500) NULL (S3 URL)                          │
│ resume_parsed       JSONB        NULL (extracted skills, experience)    │
│ created_at          TIMESTAMPTZ  DEFAULT NOW()                          │
│ updated_at          TIMESTAMPTZ  DEFAULT NOW()                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### INTERVIEWS

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ interviews                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID         PRIMARY KEY                            │
│ user_id             UUID         FK → users.id ON DELETE CASCADE        │
│ type                VARCHAR(20)  NOT NULL ('DSA' | 'SYSTEM_DESIGN')     │
│ difficulty          VARCHAR(20)  NOT NULL ('EASY'|'MEDIUM'|'HARD')      │
│ status              VARCHAR(20)  DEFAULT 'CREATED'                      │
│                                  ('CREATED'|'IN_PROGRESS'|'PAUSED'|     │
│                                   'INTERRUPTED'|'COMPLETED'|'ABANDONED') │
│ config              JSONB        NOT NULL                               │
│                                  {                                       │
│                                    topics: string[],                    │
│                                    num_questions: number,               │
│                                    time_limit_min: number | null        │
│                                  }                                       │
│ started_at          TIMESTAMPTZ  NULL                                   │
│ paused_at           TIMESTAMPTZ  NULL                                   │
│ ended_at            TIMESTAMPTZ  NULL                                   │
│ total_duration_sec  INT          NULL (excludes paused time for SD)     │
│ created_at          TIMESTAMPTZ  DEFAULT NOW()                          │
│ updated_at          TIMESTAMPTZ  DEFAULT NOW()                          │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEXES:                                                                │
│   • idx_interviews_user_id ON (user_id)                                 │
│   • idx_interviews_user_status ON (user_id, status)                     │
│   • idx_interviews_created ON (created_at DESC)                         │
└─────────────────────────────────────────────────────────────────────────┘
```

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ interview_feedback                                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ id                     UUID        PRIMARY KEY                          │
│ interview_id           UUID        UNIQUE, FK → interviews.id           │
│ overall_score          INT         NOT NULL (0-100)                     │
│ technical_score        INT         NOT NULL (0-100)                     │
│ communication_score    INT         NOT NULL (0-100)                     │
│ problem_solving_score  INT         NOT NULL (0-100)                     │
│ strengths              TEXT[]      NOT NULL                             │
│ improvements           TEXT[]      NOT NULL                             │
│ detailed_feedback      TEXT        NOT NULL (AI-generated long form)    │
│ study_topics           TEXT[]      NOT NULL                             │
│ transcript_url         VARCHAR(500) NULL (S3 URL)                       │
│ generated_at           TIMESTAMPTZ DEFAULT NOW()                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### ROUNDS

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ rounds                                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ interview_id        UUID        FK → interviews.id ON DELETE CASCADE    │
│ question_id         UUID        FK → questions.id                       │
│ round_number        INT         NOT NULL (1, 2, 3...)                   │
│ status              VARCHAR(20) DEFAULT 'NOT_STARTED'                   │
│                                 ('NOT_STARTED'|'IN_PROGRESS'|           │
│                                  'COMPLETED'|'SKIPPED')                 │
│ started_at          TIMESTAMPTZ NULL                                    │
│ ended_at            TIMESTAMPTZ NULL                                    │
│ duration_sec        INT         NULL                                    │
│ hints_used          INT         DEFAULT 0                               │
│ score               INT         NULL (0-100)                            │
│ ai_feedback         TEXT        NULL (per-round feedback)               │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEXES:                                                                │
│   • idx_rounds_interview ON (interview_id)                              │
│   • idx_rounds_interview_number ON (interview_id, round_number)         │
└─────────────────────────────────────────────────────────────────────────┘
```

### MESSAGES

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ messages                                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ round_id            UUID        FK → rounds.id ON DELETE CASCADE        │
│ role                VARCHAR(20) NOT NULL ('USER'|'ASSISTANT'|'SYSTEM')  │
│ content             TEXT        NOT NULL                                │
│ message_type        VARCHAR(20) DEFAULT 'CHAT'                          │
│                                 ('CHAT'|'HINT'|'CODE_REVIEW'|'MCQ'|     │
│                                  'SCENARIO'|'FEEDBACK')                 │
│ metadata            JSONB       NULL                                    │
│                                 {                                       │
│                                   tokens_used?: number,                 │
│                                   model?: string,                       │
│                                   mcq_answer?: string,                  │
│                                   scenario_choice?: string              │
│                                 }                                       │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEXES:                                                                │
│   • idx_messages_round ON (round_id)                                    │
│   • idx_messages_round_created ON (round_id, created_at)                │
└─────────────────────────────────────────────────────────────────────────┘
```

### QUESTIONS

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ questions                                                                │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ type                VARCHAR(20) NOT NULL ('DSA'|'SYSTEM_DESIGN')        │
│ format              VARCHAR(20) NOT NULL                                │
│                                 ('OPEN_ENDED'|'MCQ'|'SCENARIO')         │
│                                 DSA: always OPEN_ENDED                  │
│                                 SD: mix of all three                    │
│ difficulty          VARCHAR(20) NOT NULL ('EASY'|'MEDIUM'|'HARD')       │
│ title               VARCHAR(255) NOT NULL                               │
│ description         TEXT        NOT NULL (problem statement)            │
│ topics              TEXT[]      NOT NULL                                │
│                                 DSA: ['arrays', 'dp', 'trees'...]       │
│                                 SD: ['caching', 'database', 'scaling'] │
│ companies           TEXT[]      DEFAULT '{}' (where asked)              │
│ hints               TEXT[]      DEFAULT '{}' (progressive hints)        │
│ expected_approach   TEXT        NULL (ideal solution explanation)       │
│ evaluation_rubric   JSONB       NULL (scoring criteria for AI)          │
│ time_limit_min      INT         NULL (suggested time)                   │
│ is_active           BOOLEAN     DEFAULT TRUE                            │
│ times_asked         INT         DEFAULT 0                               │
│ avg_score           DECIMAL(5,2) NULL                                   │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
│ updated_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEXES:                                                                │
│   • idx_questions_type_difficulty ON (type, difficulty)                 │
│   • idx_questions_type_format ON (type, format)                         │
│   • idx_questions_topics ON (topics) USING GIN                          │
│   • idx_questions_active ON (is_active) WHERE is_active = TRUE          │
└─────────────────────────────────────────────────────────────────────────┘
```

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ question_options  (for MCQ questions)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ question_id         UUID        FK → questions.id ON DELETE CASCADE     │
│ option_key          VARCHAR(1)  NOT NULL ('A'|'B'|'C'|'D')             │
│ option_text         TEXT        NOT NULL                                │
│ is_correct          BOOLEAN     NOT NULL                                │
│ explanation         TEXT        NULL (why this is right/wrong)          │
│ order_index         INT         NOT NULL                                │
├─────────────────────────────────────────────────────────────────────────┤
│ UNIQUE (question_id, option_key)                                        │
│ INDEX idx_question_options_question ON (question_id)                    │
└─────────────────────────────────────────────────────────────────────────┘
```

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ question_test_cases  (for DSA questions only)                            │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ question_id         UUID        FK → questions.id ON DELETE CASCADE     │
│ input               TEXT        NOT NULL                                │
│ expected_output     TEXT        NOT NULL                                │
│ is_sample           BOOLEAN     NOT NULL (shown to user or hidden)      │
│ order_index         INT         NOT NULL                                │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEX idx_test_cases_question ON (question_id)                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### CODE SUBMISSIONS (DSA Only)

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ code_submissions                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ round_id            UUID        FK → rounds.id ON DELETE CASCADE        │
│ language            VARCHAR(20) NOT NULL ('javascript'|'python'|'java') │
│ code                TEXT        NOT NULL                                │
│ submission_type     VARCHAR(10) NOT NULL ('RUN'|'SUBMIT')              │
│ status              VARCHAR(20) DEFAULT 'PENDING'                       │
│                                 ('PENDING'|'RUNNING'|'COMPLETED'|       │
│                                  'ERROR'|'TIMEOUT')                     │
│ stdout              TEXT        NULL                                    │
│ stderr              TEXT        NULL                                    │
│ execution_time_ms   INT         NULL                                    │
│ memory_used_kb      INT         NULL                                    │
│ test_results        JSONB       NULL                                    │
│                                 [{                                       │
│                                   input: string,                        │
│                                   expected: string,                     │
│                                   actual: string,                       │
│                                   passed: boolean,                      │
│                                   is_sample: boolean                    │
│                                 }]                                       │
│ tests_passed        INT         NULL                                    │
│ tests_total         INT         NULL                                    │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEX idx_code_submissions_round ON (round_id)                          │
│ INDEX idx_code_submissions_round_created ON (round_id, created_at DESC) │
└─────────────────────────────────────────────────────────────────────────┘
```

### SCENARIO RESPONSES (System Design Only)

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ scenario_responses  (for System Design scenarios/MCQs)                   │
├─────────────────────────────────────────────────────────────────────────┤
│ id                  UUID        PRIMARY KEY                             │
│ round_id            UUID        FK → rounds.id ON DELETE CASCADE        │
│ question_id         UUID        FK → questions.id                       │
│ user_answer         VARCHAR(1)  NULL (for MCQ: 'A', 'B', 'C', 'D')     │
│ user_explanation    TEXT        NULL (user's reasoning)                 │
│ is_correct          BOOLEAN     NULL (for MCQ)                          │
│ ai_evaluation       TEXT        NULL (AI's assessment)                  │
│ score               INT         NULL (0-100)                            │
│ created_at          TIMESTAMPTZ DEFAULT NOW()                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDEX idx_scenario_responses_round ON (round_id)                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### ANALYTICS

```sql
┌─────────────────────────────────────────────────────────────────────────┐
│ user_daily_stats                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ id                    UUID       PRIMARY KEY                            │
│ user_id               UUID       FK → users.id ON DELETE CASCADE        │
│ date                  DATE       NOT NULL                               │
│ interviews_completed  INT        DEFAULT 0                              │
│ dsa_count             INT        DEFAULT 0                              │
│ system_design_count   INT        DEFAULT 0                              │
│ avg_score             DECIMAL(5,2) NULL                                 │
│ time_spent_min        INT        DEFAULT 0                              │
│ topics_practiced      TEXT[]     DEFAULT '{}'                           │
│ streak_days           INT        DEFAULT 0                              │
│ created_at            TIMESTAMPTZ DEFAULT NOW()                         │
│ updated_at            TIMESTAMPTZ DEFAULT NOW()                         │
├─────────────────────────────────────────────────────────────────────────┤
│ UNIQUE (user_id, date)                                                  │
│ INDEX idx_daily_stats_user_date ON (user_id, date DESC)                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Sample Data

### Example DSA Question

```json
{
  "id": "q-dsa-001",
  "type": "DSA",
  "format": "OPEN_ENDED",
  "difficulty": "MEDIUM",
  "title": "Two Sum",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  "topics": ["arrays", "hashmap"],
  "companies": ["Google", "Amazon", "Facebook"],
  "hints": [
    "Think about what information you need to store as you iterate.",
    "A hashmap can help you look up values in O(1) time.",
    "For each number, check if (target - number) exists in your hashmap."
  ],
  "expected_approach": "Use a hashmap to store each number and its index. For each number, check if the complement (target - num) exists in the map.",
  "evaluation_rubric": {
    "optimal_time": "O(n)",
    "optimal_space": "O(n)",
    "key_insights": ["hashmap for O(1) lookup", "single pass solution"]
  },
  "time_limit_min": 15
}
```

### Example System Design MCQ Question

```json
{
  "id": "q-sd-mcq-001",
  "type": "SYSTEM_DESIGN",
  "format": "MCQ",
  "difficulty": "MEDIUM",
  "title": "Database Selection for Social Media Feed",
  "description": "You're designing a social media feed that needs to handle:\n- 100 million users\n- 10,000 posts per second\n- Feed should show posts from followed users in chronological order\n\nWhich database would be most suitable for storing the feed data?",
  "topics": ["database", "scaling", "social-media"],
  "companies": ["Twitter", "Facebook", "Instagram"],
  "options": [
    {
      "key": "A",
      "text": "PostgreSQL with read replicas",
      "is_correct": false,
      "explanation": "While PostgreSQL is reliable, it may struggle with the write-heavy workload of 10K posts/second and the fan-out reads for feeds."
    },
    {
      "key": "B",
      "text": "Redis for feed cache + Cassandra for persistence",
      "is_correct": true,
      "explanation": "Redis provides fast read access for hot data (recent feeds), while Cassandra handles high write throughput and scales horizontally."
    },
    {
      "key": "C",
      "text": "MongoDB sharded cluster",
      "is_correct": false,
      "explanation": "MongoDB could work but isn't optimized for the time-series nature of feeds and the specific read patterns required."
    },
    {
      "key": "D",
      "text": "MySQL with memcached",
      "is_correct": false,
      "explanation": "Similar issues to PostgreSQL - the write throughput and fan-out reads would be challenging at this scale."
    }
  ],
  "time_limit_min": 3
}
```

### Example System Design Scenario Question

```json
{
  "id": "q-sd-scenario-001",
  "type": "SYSTEM_DESIGN",
  "format": "SCENARIO",
  "difficulty": "HARD",
  "title": "Handling Viral Content",
  "description": "Your URL shortener is working well with 1000 requests/second. Suddenly, a shortened link goes viral and you're seeing 100,000 requests/second for that single URL.\n\nYour current architecture:\n- Load balancer → 3 API servers → PostgreSQL\n- No caching layer\n\nUsers are reporting timeouts. Walk me through how you would handle this situation in the next 30 minutes.",
  "topics": ["caching", "scaling", "hot-keys"],
  "companies": ["Twitter", "bit.ly"],
  "hints": [
    "Think about where the bottleneck is.",
    "Consider what can be cached and at what layer.",
    "How would you handle a single hot key specifically?"
  ],
  "evaluation_rubric": {
    "key_points": [
      "Identify database as bottleneck",
      "Add Redis/Memcached caching layer",
      "CDN for this specific URL",
      "Rate limiting to protect system",
      "Monitoring to detect hot keys"
    ],
    "bonus_points": [
      "Consistent hashing for cache",
      "Local in-memory cache on API servers",
      "Async logging to reduce DB writes"
    ]
  },
  "time_limit_min": 10
}
```

---

## Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  avatarUrl String?  @map("avatar_url")
  googleId  String   @unique @map("google_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  profile    UserProfile?
  interviews Interview[]
  dailyStats UserDailyStats[]

  @@map("users")
}

model UserProfile {
  id                String   @id @default(uuid())
  userId            String   @unique @map("user_id")
  experienceYears   Int?     @map("experience_years")
  targetRole        String?  @map("target_role")
  targetCompany     String?  @map("target_company")
  preferredLanguage String   @default("javascript") @map("preferred_language")
  skills            String[] @default([])
  weakTopics        String[] @default([]) @map("weak_topics")
  strongTopics      String[] @default([]) @map("strong_topics")
  resumeUrl         String?  @map("resume_url")
  resumeParsed      Json?    @map("resume_parsed")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}

enum InterviewType {
  DSA
  SYSTEM_DESIGN
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum InterviewStatus {
  CREATED
  IN_PROGRESS
  PAUSED
  INTERRUPTED
  COMPLETED
  ABANDONED
}

model Interview {
  id               String          @id @default(uuid())
  userId           String          @map("user_id")
  type             InterviewType
  difficulty       Difficulty
  status           InterviewStatus @default(CREATED)
  config           Json
  startedAt        DateTime?       @map("started_at")
  pausedAt         DateTime?       @map("paused_at")
  endedAt          DateTime?       @map("ended_at")
  totalDurationSec Int?            @map("total_duration_sec")
  createdAt        DateTime        @default(now()) @map("created_at")
  updatedAt        DateTime        @updatedAt @map("updated_at")

  user     User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  rounds   Round[]
  feedback InterviewFeedback?

  @@index([userId])
  @@index([userId, status])
  @@map("interviews")
}

model InterviewFeedback {
  id                  String   @id @default(uuid())
  interviewId         String   @unique @map("interview_id")
  overallScore        Int      @map("overall_score")
  technicalScore      Int      @map("technical_score")
  communicationScore  Int      @map("communication_score")
  problemSolvingScore Int      @map("problem_solving_score")
  strengths           String[]
  improvements        String[]
  detailedFeedback    String   @map("detailed_feedback")
  studyTopics         String[] @map("study_topics")
  transcriptUrl       String?  @map("transcript_url")
  generatedAt         DateTime @default(now()) @map("generated_at")

  interview Interview @relation(fields: [interviewId], references: [id], onDelete: Cascade)

  @@map("interview_feedback")
}

enum RoundStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  SKIPPED
}

model Round {
  id          String      @id @default(uuid())
  interviewId String      @map("interview_id")
  questionId  String      @map("question_id")
  roundNumber Int         @map("round_number")
  status      RoundStatus @default(NOT_STARTED)
  startedAt   DateTime?   @map("started_at")
  endedAt     DateTime?   @map("ended_at")
  durationSec Int?        @map("duration_sec")
  hintsUsed   Int         @default(0) @map("hints_used")
  score       Int?
  aiFeedback  String?     @map("ai_feedback")
  createdAt   DateTime    @default(now()) @map("created_at")

  interview         Interview          @relation(fields: [interviewId], references: [id], onDelete: Cascade)
  question          Question           @relation(fields: [questionId], references: [id])
  messages          Message[]
  codeSubmissions   CodeSubmission[]
  scenarioResponses ScenarioResponse[]

  @@index([interviewId])
  @@index([interviewId, roundNumber])
  @@map("rounds")
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}

model Message {
  id          String      @id @default(uuid())
  roundId     String      @map("round_id")
  role        MessageRole
  content     String
  messageType String      @default("CHAT") @map("message_type")
  metadata    Json?
  createdAt   DateTime    @default(now()) @map("created_at")

  round Round @relation(fields: [roundId], references: [id], onDelete: Cascade)

  @@index([roundId])
  @@index([roundId, createdAt])
  @@map("messages")
}

enum QuestionFormat {
  OPEN_ENDED
  MCQ
  SCENARIO
}

model Question {
  id                String         @id @default(uuid())
  type              InterviewType
  format            QuestionFormat
  difficulty        Difficulty
  title             String
  description       String
  topics            String[]
  companies         String[]       @default([])
  hints             String[]       @default([])
  expectedApproach  String?        @map("expected_approach")
  evaluationRubric  Json?          @map("evaluation_rubric")
  timeLimitMin      Int?           @map("time_limit_min")
  isActive          Boolean        @default(true) @map("is_active")
  timesAsked        Int            @default(0) @map("times_asked")
  avgScore          Decimal?       @map("avg_score") @db.Decimal(5, 2)
  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  rounds            Round[]
  options           QuestionOption[]
  testCases         QuestionTestCase[]
  scenarioResponses ScenarioResponse[]

  @@index([type, difficulty])
  @@index([type, format])
  @@map("questions")
}

model QuestionOption {
  id          String  @id @default(uuid())
  questionId  String  @map("question_id")
  optionKey   String  @map("option_key")
  optionText  String  @map("option_text")
  isCorrect   Boolean @map("is_correct")
  explanation String?
  orderIndex  Int     @map("order_index")

  question Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([questionId, optionKey])
  @@index([questionId])
  @@map("question_options")
}

model QuestionTestCase {
  id             String   @id @default(uuid())
  questionId     String   @map("question_id")
  input          String
  expectedOutput String   @map("expected_output")
  isSample       Boolean  @map("is_sample")
  orderIndex     Int      @map("order_index")
  createdAt      DateTime @default(now()) @map("created_at")

  question Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId])
  @@map("question_test_cases")
}

enum SubmissionType {
  RUN
  SUBMIT
}

enum SubmissionStatus {
  PENDING
  RUNNING
  COMPLETED
  ERROR
  TIMEOUT
}

model CodeSubmission {
  id              String           @id @default(uuid())
  roundId         String           @map("round_id")
  language        String
  code            String
  submissionType  SubmissionType   @map("submission_type")
  status          SubmissionStatus @default(PENDING)
  stdout          String?
  stderr          String?
  executionTimeMs Int?             @map("execution_time_ms")
  memoryUsedKb    Int?             @map("memory_used_kb")
  testResults     Json?            @map("test_results")
  testsPassed     Int?             @map("tests_passed")
  testsTotal      Int?             @map("tests_total")
  createdAt       DateTime         @default(now()) @map("created_at")

  round Round @relation(fields: [roundId], references: [id], onDelete: Cascade)

  @@index([roundId])
  @@index([roundId, createdAt(sort: Desc)])
  @@map("code_submissions")
}

model ScenarioResponse {
  id              String   @id @default(uuid())
  roundId         String   @map("round_id")
  questionId      String   @map("question_id")
  userAnswer      String?  @map("user_answer")
  userExplanation String?  @map("user_explanation")
  isCorrect       Boolean?  @map("is_correct")
  aiEvaluation    String?  @map("ai_evaluation")
  score           Int?
  createdAt       DateTime @default(now()) @map("created_at")

  round    Round    @relation(fields: [roundId], references: [id], onDelete: Cascade)
  question Question @relation(fields: [questionId], references: [id])

  @@index([roundId])
  @@map("scenario_responses")
}

model UserDailyStats {
  id                   String   @id @default(uuid())
  userId               String   @map("user_id")
  date                 DateTime @db.Date
  interviewsCompleted  Int      @default(0) @map("interviews_completed")
  dsaCount             Int      @default(0) @map("dsa_count")
  systemDesignCount    Int      @default(0) @map("system_design_count")
  avgScore             Decimal? @map("avg_score") @db.Decimal(5, 2)
  timeSpentMin         Int      @default(0) @map("time_spent_min")
  topicsPracticed      String[] @default([]) @map("topics_practiced")
  streakDays           Int      @default(0) @map("streak_days")
  createdAt            DateTime @default(now()) @map("created_at")
  updatedAt            DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
  @@index([userId, date(sort: Desc)])
  @@map("user_daily_stats")
}
```

---

## Next: Adaptive Question Selection Algorithm

Now that we have the data model, should we design how the **Adaptive Question Selection** works? This is the algorithm that:

1. Reads user's resume/profile
2. Considers their past performance
3. Selects the right difficulty for next question
4. Balances topics for assessment

Want to dive into that next, or move to **Project Setup** and start coding?
