End the current development session properly with all quality gates.

## Execute These Steps in Order:

### 1. Quality Gates

#### Run Linting
```bash
pnpm lint
```
If there are errors, fix them automatically with `pnpm lint --fix` or manually.
Report any issues that couldn't be auto-fixed.

#### Run Type Checking
```bash
pnpm typecheck
```
Fix any TypeScript errors before proceeding.

#### Run Tests
```bash
pnpm test
```
All tests must pass. If tests fail:
- Show which tests failed
- Attempt to fix if it's a simple issue
- Otherwise, flag for user attention

### 2. Update Beads

For each task worked on this session:
- Update the task notes with what was accomplished
- If the task is complete, close it with a reason
- If incomplete, leave notes about what's left

Create new issues for:
- Any bugs discovered during development
- Follow-up tasks identified
- Technical debt to address later

### 3. Prepare Commit

#### Check for uncommitted changes
```bash
git status
```

#### Review what will be committed
Show a summary of:
- Files added
- Files modified
- Files deleted

#### Create commit message
Follow our format: `type: description`
- feat: new feature
- fix: bug fix
- docs: documentation
- refactor: code restructuring
- test: adding tests
- chore: maintenance

#### Stage and commit
```bash
git add .
git commit -m "type: description"
```

### 4. Push (with user confirmation)
Ask user if they want to push now:
```bash
git push
```

### 5. Session Summary

```
✈️ Session Complete - Landed Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 What Was Accomplished:
- [description of work done]

📝 Issues Updated:
- bd-xxx: [status] - notes
- bd-yyy: [status] - notes

🔧 Quality Gates:
✅ Linting passed
✅ Type checking passed
✅ Tests passed (X/X)

📦 Committed: "type: description"
🚀 Pushed to remote: [branch]

📌 Suggested Next Task:
Based on `bd ready`, consider working on:
- [next priority task]
```

### 6. Cleanup
- Remove any debug console.logs
- Remove any TODO comments that were addressed
- Clean up any temporary files
