Run a comprehensive code review on recent changes.

## Steps to Execute:

### 1. Get the Changes
First, determine what to review:

If there are staged changes:
```bash
git diff --staged
```

Otherwise, get recent uncommitted changes:
```bash
git diff
```

Or if asked to review a specific commit:
```bash
git diff HEAD~1
```

### 2. Invoke Code Reviewer Sub-Agent
Use the code-reviewer sub-agent which has a fresh context window dedicated to finding issues.

Say: "I need you to use the code-reviewer sub-agent to review these changes"

The code-reviewer will:
- Check for bugs and logic errors
- Check for security vulnerabilities
- Check for performance issues
- Verify coding standards compliance
- Check error handling
- Review test coverage

### 3. Present Findings
Organize the review results by severity:

```markdown
## Code Review Results
━━━━━━━━━━━━━━━━━━━━━

### 🔴 Critical Issues (Must Fix)
[Issues that must be fixed before commit]

### 🟡 Warnings (Should Fix)
[Issues that should be addressed]

### 🟢 Suggestions (Nice to Have)
[Minor improvements]

### ✅ What's Good
[Positive observations]
```

### 4. Offer to Fix Issues
For each critical and warning issue:
- Offer to fix it automatically
- Show the proposed fix
- Ask for user confirmation

### 5. Re-verify After Fixes
If fixes were made:
- Run the quality gates again
- Ensure tests still pass
- Show updated diff

### 6. Final Status
```
📋 Review Complete
━━━━━━━━━━━━━━━━━

Status: [Ready to commit / Needs more work]

Issues Found: X critical, Y warnings, Z suggestions
Issues Fixed: N

Next steps:
- [what to do next]
```
