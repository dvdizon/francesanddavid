# Task: Disable CI and production deploy

## Checklist
- [x] Remove CI workflow from GitHub Actions
- [x] Stop automated deploys to the production server
- [x] Record the decision for future reference

## Notes
- The GitHub Actions workflow that ran tests and SSH deploys has been removed to disable CI entirely.
- Production deploys via the DigitalOcean host are now disabled because the workflow no longer exists.

## Decisions
- Keep CI/deploy disabled until a new hosting workflow is explicitly added.
