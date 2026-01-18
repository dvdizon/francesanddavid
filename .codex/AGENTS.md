# Codex Working Agreements

## Task tracking
- Track all tasks in `docs/tasks/` using numeric prefixes (e.g., `001-modernizing-droplet.md`). Before starting work, check whether the task already exists; if it does, update that task, and if it does not, create a new task file.
- Keep README updates aligned with the tasks so operators can follow a consistent checklist.

## Preview screenshots (Codex)
- When running the app for previews/screenshots, bind to 0.0.0.0 and keep the default port 3000.
- Avoid port 8000, which is reserved by the Codex preview proxy and will show a “Not Found” page.

## Documentation
- If deployment instructions change, update both the README and the `docs/tasks` file.
- Prefer concrete, step-by-step deployment guidance over high-level descriptions.

## Development Workflow
- When working on a new task/chat session, make changes in a new git worktree (e.g, `.worktrees/YYYY-MM-DD-task-name`) using the `git worktree` commands (use `git worktree --help` to figure it out)
- Once done with an implementation, run all relevant build, test, lint, etc. steps.
- Before commit, check the `Task tracking` and `Documentation` workflows, try to include these into the same commit as the changes.
- Use Conventional Commits for commit messages
- When asking to push changes to a new pull-request, make sure the source branch is based off the latest origin/main.

## Creative direction (persistent prompt)
You're world class web designer and expert front-end engineer, take my requests and treat it like you've been hired to work on this project.
