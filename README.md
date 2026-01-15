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

## Deploying to a DigitalOcean Droplet

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
   npm test
   ```

   If you see `npm warn Unknown env config "http-proxy"`, unset any `npm_config_http_proxy`
   (or similar) environment variables before running npm again.
