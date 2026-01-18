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


## Deploying to a DigitalOcean Droplet

### GitHub Actions deployment (recommended)

Required GitHub Secrets:

- `DO_HOST` (droplet IP or hostname)
- `DO_USER` (SSH user, e.g. `deploy`)
- `DO_SSH_KEY` (private key, PEM format)
- `DO_PORT` (optional, defaults to `22`)

One-time droplet setup checklist (Ubuntu assumed):

1. **Create a deploy user and grant SSH access.**
2. **Update the OS:**

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

   **Troubleshooting (DigitalOcean droplet agent repo):** If `apt update` fails with a
   `NO_PUBKEY 35696F43FC7DB4C2` error or a 404 for `droplet-agent`, refresh the repo
   key or remove the legacy source before retrying:

   ```bash
   # Option A: refresh the droplet agent repo key
   curl -fsSL https://repos-droplet.digitalocean.com/gpgkey | \
     sudo gpg --dearmor -o /usr/share/keyrings/droplet-agent-archive.gpg

   # Option B: remove the droplet agent source if you don't need it
   sudo rm -f /etc/apt/sources.list.d/droplet-agent.list
   sudo apt update
   ```

3. **Install Node.js 20 LTS (or 18 LTS) and npm:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

   **Troubleshooting (NodeSource GPG key):** If `apt update` or `apt install` fails with
   `NO_PUBKEY 2F59B5F99B1BE0B4`, refresh the NodeSource key and repo, then retry:

   ```bash
   curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
     sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
   echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | \
     sudo tee /etc/apt/sources.list.d/nodesource.list
   sudo apt update
   sudo apt install -y nodejs
   ```

4. **Clone the repository into the deploy path and set permissions:**

   ```bash
   sudo mkdir -p /var/www/francesanddavid
   sudo chown -R <your-deploy-user>:<your-deploy-user> /var/www/francesanddavid
   git clone <your-repo-url> /var/www/francesanddavid
   ```

5. **Install PM2 globally and configure startup:**

   ```bash
   sudo npm install -g pm2
   pm2 startup
   pm2 save
   ```

6. **Ensure server-side environment variables exist:**

   Populate `/var/www/francesanddavid/.env` as needed. The deploy workflow does not
   overwrite this file.

7. **Confirm Nginx proxies to the Node upstream:**

   Nginx should proxy `http://127.0.0.1:3000`, and `/health` should return `200`.

Verify a deploy:

```bash
pm2 status francesanddavid
curl -fsS http://127.0.0.1:3000/health
pm2 logs francesanddavid --lines 80
```

### Manual deployment (fallback)

These steps assume Ubuntu on your Droplet and that you want to keep costs low by continuing to run a single VM.

1. **SSH into the Droplet and update the OS:**

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

   **Troubleshooting (DigitalOcean droplet agent repo):** If `apt update` fails with a
   `NO_PUBKEY 35696F43FC7DB4C2` error or a 404 for `droplet-agent`, refresh the repo
   key or remove the legacy source before retrying:

   ```bash
   # Option A: refresh the droplet agent repo key
   curl -fsSL https://repos-droplet.digitalocean.com/gpgkey | \
     sudo gpg --dearmor -o /usr/share/keyrings/droplet-agent-archive.gpg

   # Option B: remove the droplet agent source if you don't need it
   sudo rm -f /etc/apt/sources.list.d/droplet-agent.list
   sudo apt update
   ```

2. **Install Node.js 20 LTS (or 18 LTS) and npm:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

   **Troubleshooting (NodeSource GPG key):** If `apt update` or `apt install` fails with
   `NO_PUBKEY 2F59B5F99B1BE0B4`, refresh the NodeSource key and repo, then retry:

   ```bash
   curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
     sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
   echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | \
     sudo tee /etc/apt/sources.list.d/nodesource.list
   sudo apt update
   sudo apt install -y nodejs
   ```

3. **Clone the repository and install production dependencies:**

   ```bash
   git clone <your-repo-url>
   cd francesanddavid
   npm install --omit=dev
   ```

4. **Set environment variables for the server:**

   ```bash
   export HOST=0.0.0.0
   export PORT=3000
   ```

5. **Start the server (choose one):**

   - **PM2 (recommended for simplicity):**

     ```bash
     npm install -g pm2
     pm2 start index.js --name francesanddavid
     pm2 save
     pm2 startup
     ```

   - **Systemd (for native service management):**

     Create `/etc/systemd/system/francesanddavid.service` with:

     ```ini
     [Unit]
     Description=Frances and David website
     After=network.target

     [Service]
     Type=simple
     WorkingDirectory=/path/to/francesanddavid
     ExecStart=/usr/bin/node /path/to/francesanddavid/index.js
     Restart=on-failure
     Environment=HOST=0.0.0.0
     Environment=PORT=3000

     [Install]
     WantedBy=multi-user.target
     ```

     Then enable it:

     ```bash
     sudo systemctl daemon-reload
     sudo systemctl enable --now francesanddavid
     ```

6. **(Optional) Add Nginx for TLS + port 80/443:**

   Use Nginx to proxy `https://your-domain` to `http://127.0.0.1:3000` so the Node app can stay on a non-root port.

7. **Verify the deployment:**

   ```bash
   pm2 status francesanddavid
   curl -fsS http://127.0.0.1:3000/health
   ```

   If you see `npm warn Unknown env config "http-proxy"`, unset any `npm_config_http_proxy`
   (or similar) environment variables before running npm again.
### HTTPS (Certbot + Nginx)

If HTTPS is not working after you set up Nginx, make sure an SSL (port 443) server block exists for your domain. The easiest fix is to let Certbot configure it for you:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com


```

