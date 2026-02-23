---
description: Git branching workflow — never push directly to main
---

# Git Workflow

## Rules
1. **Never push directly to `main`**
2. All changes go through a **feature branch**
3. Branch naming: `feature/<short-description>` (e.g. `feature/orange-accent-color`)

## Steps for every change

// turbo-all

1. Create a feature branch from main:
   ```
   git checkout main && git pull origin main
   git checkout -b feature/<branch-name>
   ```

2. Make your code changes

3. Stage and commit:
   ```
   git add .
   git commit -m "<descriptive commit message>"
   ```

4. Push the feature branch:
   ```
   git push -u origin feature/<branch-name>
   ```

5. Create a Pull Request:
   ```
   gh pr create --title "<PR title>" --body "<PR description>" --base main
   ```

6. After user approval, merge:
   ```
   gh pr merge --squash --delete-branch
   ```

7. Switch back to main:
   ```
   git checkout main && git pull origin main
   ```
