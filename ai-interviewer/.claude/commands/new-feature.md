Plan and set up a new feature: $ARGUMENTS

## This is a PLANNING workflow - do not write implementation code yet!

### Step 1: Enter Plan Mode
Activate plan mode (Shift+Tab twice or prefix with /plan).
Do NOT write any implementation code during planning.

### Step 2: Research & Discovery
- Search the codebase for related functionality
- Understand existing patterns we should follow
- Identify files that will need to be created or modified

### Step 3: Clarifying Questions
Ask the user important questions:
- What are the exact requirements?
- Are there edge cases to consider?
- What's the priority/timeline?
- Any constraints to be aware of?

### Step 4: Create Detailed Plan
Write a comprehensive implementation plan including:

```markdown
## Feature: [Name]

### Overview
Brief description of what we're building

### Requirements
- Functional requirements
- Non-functional requirements (performance, security)

### Technical Approach
- Architecture decisions
- Key components to create
- Integration points

### Files to Create/Modify
- [ ] path/to/file.ts - Description of changes

### Dependencies
- Any new packages needed
- Existing services to use

### API Design (if applicable)
- Endpoints
- Request/response shapes
- WebSocket events

### Database Changes (if applicable)
- Schema changes
- Migrations needed

### Security Considerations
- Authentication/authorization
- Input validation
- Data protection

### Testing Strategy
- Unit tests needed
- Integration tests needed

### Estimated Effort
- Approximate time/complexity
```

### Step 5: Plan Review
Invoke the plan-reviewer sub-agent:
"Run plan-reviewer on this plan"

Address any concerns raised by the reviewer.
Revise the plan as needed.

### Step 6: Create Beads Issues
Break the plan into tasks:
- Each task should be completable in one session (~40% context)
- Create an epic for the feature
- Create child tasks with clear descriptions
- Set up dependencies between tasks

```bash
# Create epic
bd create "Epic: [Feature Name]" -p 1 --type epic

# Create tasks
bd create "Task description" -p 2 --parent [epic-id]
```

### Step 7: Show Task Graph
Display the created tasks and their dependencies.
Run `bd list --parent [epic-id]` to show the breakdown.

### Step 8: Wait for Approval
Present the plan and task breakdown to the user.
Do NOT start implementing until user says "proceed" or "approved".

## Output at End
```
📋 Feature Plan: [Name]
━━━━━━━━━━━━━━━━━━━━━━━

[Summary of the plan]

📦 Tasks Created:
- bd-xxx: Epic: [Feature Name] [P1]
  ├── bd-aaa: [Task 1] [P2]
  ├── bd-bbb: [Task 2] [P2] (blocked by bd-aaa)
  └── bd-ccc: [Task 3] [P2] (blocked by bd-bbb)

Ready to implement? Say "proceed" to start with the first task.
```
