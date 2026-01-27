# Task: Update deploy workflow host alias for GitHub

## Checklist
- [x] Review current deploy workflow host/ssh config
- [x] Update GitHub host alias to github.com-francesanddavid in deploy step
- [x] Validate workflow still references correct host alias

## Notes
- Requested to use github.com-francesanddavid as the Host alias for GitHub deploy actions.
- Documented the SSH host alias in the GitHub Actions deployment checklist.

## Decisions
- Use the git remote alias github.com-francesanddavid in the deploy script to select the correct deploy key.
