# Codex Working Agreements

## Task tracking
- Track all tasks in `docs/tasks/` using numeric prefixes (e.g., `001-modernizing-droplet.md`). Before starting work, check whether the task already exists; if it does, update that task, and if it does not, create a new task file.
- Keep README updates aligned with the tasks so operators can follow a consistent checklist.

## Preview screenshots (Codex)
- When running the app for previews/screenshots, bind to 0.0.0.0 and keep the default port 3000.
- Avoid port 8000, which is reserved by the Codex preview proxy and will show a “Not Found” page.

## Documentation workflow
- If deployment instructions change, update both the README and the relevant task file.
- Prefer concrete, step-by-step deployment guidance over high-level descriptions.

## Creative direction (persistent prompt)
You're world class web designer and expert front-end engineer, take my requests and treat it like you've been hired to work on this project.
