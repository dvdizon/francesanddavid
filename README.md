francesanddavid
--------

A basic webserver with some basic html and client-side js to hold information about Frances and David's engagement and wedding.

Using:

- [hapi.js](http://hapijs.com/)
- [jquery](https://jquery.com/)
- [masonry](http://masonry.desandro.com/) + [imagesloaded](http://imagesloaded.desandro.com/)
- [isotope](http://isotope.metafizzy.co/)
- [imagelightbox](http://osvaldas.info/image-lightbox-responsive-touch-friendly)
- [digital ocean](https://digitalocean.com/) (for hosting)
- [node/pm2](https://github.com/Unitech/pm2) (for running server in the background)

## Local development

```bash
npm install
npm run local
```

`npm run local` binds to `0.0.0.0` so browser automation and screenshot tools can reach the server through forwarded ports.
It keeps the default `3000` port so Codex preview screenshots reach the correct service (port `8000` is reserved by the preview proxy).
If you only bind to `127.0.0.1`, external browser containers will return a Not Found page.

## Running on Windows

`npm run local` sets environment variables using a Unix-style prefix, so on Windows start the server
by setting `HOST` and `PORT` in your shell first.

**PowerShell**
```powershell
$env:HOST="0.0.0.0"
$env:PORT="3000"
node index.js
```

**Command Prompt (cmd.exe)**
```cmd
set HOST=0.0.0.0
set PORT=3000
node index.js
```


## Deploying to GitHub Pages

These steps assume the site is served from this repo’s default branch and the HTML entry points live in the repository root.

1. **Confirm the repository is ready for Pages.**
   - `index.html`, `program.html`, and `wedding.html` must be in the repository root.
   - Asset and navigation paths should remain relative (for example, `assets/...`, `program.html`).

2. **Enable GitHub Pages.**
   - Open **Settings → Pages** in the GitHub repository.
   - Under **Build and deployment**, choose **Deploy from a branch**.
   - Select the default branch (usually `main`) and **/(root)** as the folder.
   - Save. GitHub will publish to `https://<org-or-user>.github.io/<repo>/`.

3. **Verify the deployment.**
   - Visit the Pages URL and confirm the homepage loads.
   - Click through `program.html` and `wedding.html` to ensure routes and assets resolve.

### Configure a custom domain

1. **Add the domain in GitHub Pages settings.**
   - In **Settings → Pages**, enter your custom domain (for example, `francesanddavid.com`) and save.
   - This writes a `CNAME` file at the repository root. If it does not, create `CNAME` manually with just the domain.

2. **Update DNS at your registrar.**
   - **Apex/root domain (`francesanddavid.com`):** add four `A` records pointing to GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **IPv6 (optional):** add `AAAA` records:
     - `2606:50c0:8000::153`
     - `2606:50c0:8001::153`
     - `2606:50c0:8002::153`
     - `2606:50c0:8003::153`
   - **`www` subdomain:** add a `CNAME` record pointing to `<org-or-user>.github.io`.

3. **Wait for DNS propagation, then enforce HTTPS.**
   - After the custom domain resolves, return to **Settings → Pages** and enable **Enforce HTTPS**.
   - If HTTPS is not available yet, give it a few minutes and retry once DNS settles.
