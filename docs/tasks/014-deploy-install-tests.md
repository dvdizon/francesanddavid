# 014 - Deployment install + CI tests

## Goal
Keep production installs dev-free while ensuring the lock file stays in sync and tests run in CI.

## Checklist
- [x] Regenerate `package-lock.json` so devDependencies (Playwright) are locked.
- [x] Add a production install script for deployment usage.
- [x] Update the deploy workflow to use the production install script.
- [x] Add a GitHub Action job that runs `npm test`.
- [x] Remove `package-lock.json` from `.gitignore`.
- [x] Loosen Node engine range to allow v24.
- [ ] Smoke test (or document if skipped).

## Decisions
- None yet.

## Notes
- Smoke tests not run in this environment.
