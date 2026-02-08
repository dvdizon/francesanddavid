# Task: Provide GitHub Pages migration guidance

## Checklist
- [x] Review current site structure and routes for static hosting compatibility
- [x] Move HTML entry points to the repository root for GitHub Pages hosting
- [x] Update links/asset paths to work without a server or custom domain
- [x] Document GitHub Pages configuration steps and required repository settings
- [x] Document custom domain + DNS configuration steps for GitHub Pages

## Notes
- The site is static HTML with JS/CSS assets, now hosted from the repository root (`index.html`, `program.html`, `wedding.html`) so GitHub Pages can serve it directly.
- Navigation and asset paths were updated to be relative (`assets/...`, `program.html`, `wedding.html`) so the site works whether hosted at a repo subpath or a custom domain.
- Recommended deployment flow: enable Pages from the default branch and `/root`, then verify the published URL loads the homepage and subpages.
- Custom domains require adding the domain in GitHub Pages settings, adding DNS `A` records for the apex, and a `CNAME` for `www`, then enabling HTTPS once DNS resolves.

## Decisions
- Prefer a GitHub Pages "project site" deployment from the default branch, using root-level HTML files and relative paths to avoid custom-domain requirements.
