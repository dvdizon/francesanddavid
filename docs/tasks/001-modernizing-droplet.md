# 001 - Modernizing the Droplet

## Goal
Modernize the existing DigitalOcean Droplet deployment while keeping costs low and continuing to run the app on a single VM.

## Tasks
- [ ] Upgrade the Droplet OS packages and reboot if required.
- [ ] If `apt update` fails due to a missing DigitalOcean droplet agent key or 404s,
  refresh the repo key or remove the legacy droplet-agent source before retrying.
- [ ] Install a modern Node.js LTS (18 or 20) via Nodesource or `nvm`.
- [ ] Clone this repository to the Droplet and install dependencies with `npm install --omit=dev`.
- [ ] Configure environment variables:
  - `HOST=0.0.0.0`
  - `PORT=3000` (or any non-root port you want to use behind a proxy)
- [ ] Configure a process manager (PM2 or systemd) so the app restarts on reboot.
- [ ] Add an Nginx reverse proxy (optional) to terminate TLS and forward traffic to the Node port.
- [ ] Confirm the smoke test passes by running `npm test` on the Droplet.

## Notes
- The app now defaults to `0.0.0.0:3000` for safer local and production usage.
- See the README for step-by-step Droplet deployment instructions.
