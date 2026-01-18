# Codex Working Agreements

## Task tracking
- Track all tasks in `docs/tasks/` using numeric prefixes (e.g., `001-modernizing-droplet.md`). Before starting work, check whether the task already exists; if it does, update that task, and if it does not, create a new task file.
- Keep task checklists in `docs/tasks/` and do not mirror them into the README.
- Record key decisions in the relevant `docs/tasks/` file so they can be retraced later.

## Preview screenshots (Codex)
- When running the app for previews/screenshots, bind to 0.0.0.0 and keep the default port 3000.
- Avoid port 8000, which is reserved by the Codex preview proxy and will show a “Not Found” page.

## Documentation
- Only update README documentation when the environment setup steps for the app change.
- Prefer concrete, step-by-step deployment guidance over high-level descriptions.

## Development Workflow
- Ask clarifying questions if you are unsure about specifics, give the option to defer decisions
- Before implementing a new task, and make changes to the local git, create a new git worktree (e.g, `.worktrees/YYYY-MM-DD-task-name`) using the `git worktree` commands (use `git worktree --help` to figure it out)
- Once done with an implementation, run all relevant build, test, lint, etc. steps.
- Before commit, check the `Task tracking` and `Documentation` workflows, try to include these into the same commit as the changes.
- Use Conventional Commits for commit messages (see https://www.conventionalcommits.org/en):
    ```
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
    ```
- When asking to push changes to a new pull-request, make sure the source branch is based off the latest origin/main.
- Always provide a detailed pull request description. Use original requests as a seed for motivation for filling the description.

## Creative direction (persistent prompt)
You're world class web designer and expert front-end engineer, take my requests and treat it like you've been hired to work on this project.
