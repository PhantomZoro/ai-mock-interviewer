Fix the beads issue: $ARGUMENTS

## Steps to Execute:

### 1. Get Issue Details
```bash
bd show $ARGUMENTS
```

Display:
- Issue title and description
- Priority
- Current status
- Any notes/comments
- Dependencies

### 2. Update Status
```bash
bd update $ARGUMENTS --status in_progress
```

### 3. Research the Problem
- Read the issue description carefully
- Search the codebase for relevant files
- Understand the current implementation
- Identify what needs to change

### 4. Create a Fix Plan
Before making changes, outline:
- What files will be modified
- What the fix approach is
- Any tests that need updating
- Potential side effects

Ask user to confirm the approach.

### 5. Implement the Fix
- Make the necessary code changes
- Update or add tests as needed
- Ensure the fix doesn't break existing functionality

### 6. Verify the Fix
- Run the specific tests related to the fix
- Run the full test suite
- Run linting

### 7. Code Review
Invoke the code-reviewer sub-agent:
"Run code-reviewer on these changes"

Address any issues found.

### 8. Update the Issue
```bash
bd update $ARGUMENTS --notes "Fixed by [description of what was done]"
```

### 9. Close or Continue
If the fix is complete:
```bash
bd close $ARGUMENTS --reason "Description of the fix"
```

If more work is needed, leave notes about what's remaining.

### 10. Summary
```
🔧 Issue Fix Complete
━━━━━━━━━━━━━━━━━━━━

Issue: $ARGUMENTS
Status: [Fixed / Partially Fixed / Needs More Work]

Changes Made:
- [list of changes]

Tests: [passed/failed]

Ready for commit: [yes/no]
```
