# 012 - Supply-chain hardening (CDN assets)

## Goal
Reduce supply-chain risk by self-hosting third-party CSS/JS assets currently loaded from CDNs.

## Checklist
- [x] Upgrade vendored jQuery to 3.7.1 and Bootstrap JS to 3.4.1.
- [x] Vendor PureCSS, Font Awesome, jQuery, and Bootstrap assets under assets/vendor.
- [x] Update HTML templates to reference local vendor paths.
- [x] Verify no remaining CDN references for these assets.
- [ ] Smoke test page loads (or document if skipped).
- [x] Add a regression guard against deprecated `$(window).load` usage.
- [x] Add a Playwright browser test for the program modal.
- [x] Add a Playwright browser test to assert scroll panel content renders.

## Decisions
- Self-host third-party CSS/JS assets under `assets/vendor/` to reduce CDN supply-chain risk.
- Upgrade jQuery to `3.7.1` and Bootstrap JS to `3.4.1` for security fixes while keeping the existing Bootstrap 3 usage.
- Add a basic CSP header in Nginx to reduce XSS blast radius while allowing current embeds (Vimeo/YouTube/Google Maps/Google Fonts).

## Notes
- `npm test` (smoke test) passed after the upgrades.
- Updated the jQuery window load handler to `.on('load', ...)` for jQuery 3.x compatibility.
- Updated the program modal load handler to `.on('load', ...)` for jQuery 3.x compatibility.
