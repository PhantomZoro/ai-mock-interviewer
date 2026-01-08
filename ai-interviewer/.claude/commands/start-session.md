Start a new development session for the AI Mock Interviewer project.

## Steps to Execute:

### 1. Check Available Tasks
Run `bd ready` to see tasks with no blockers, ready to work on.

Display the top 5 tasks sorted by priority (P0 is highest, P4 is lowest).

### 2. Show Project Status
- How many open issues total (`bd list --status open | wc -l`)
- How many in progress (`bd list --status in_progress`)
- Brief project health check

### 3. Ask User to Pick a Task
Present the ready tasks and ask which one to work on.

### 4. Once Task is Selected
- Update the task status: `bd update <id> --status in_progress`
- Read the task details: `bd show <id>`
- Find related files in the codebase
- Summarize what needs to be done
- Ask if user wants to start in plan mode (recommended for complex tasks)

### 5. Context Check
- Run `/cost` equivalent to check context usage
- If above 40%, suggest starting fresh with `/clear`

## Output Format
```
🚀 Starting Development Session
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Available Tasks (Priority Order):
1. [P0] bd-xxx: Task description
2. [P1] bd-yyy: Task description
...

📊 Project Status:
- Open: X issues
- In Progress: Y issues

Which task would you like to work on? (Enter the task ID)
```
