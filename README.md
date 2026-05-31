# NexProxy 🌐

A fast, permanent web proxy powered by [Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet).

## Features
- 🔒 XOR-encoded URLs (bypasses basic URL filters)
- ⚡ Service Worker powered (no redirects, seamless browsing)
- 🌍 Works on Chromebooks, school/work networks
- 🚫 No logs
- 🎨 Beautiful dark UI with quick links

## Run Locally

```bash
npm install
npm start
# → http://localhost:8080
```

## Deploy for Free (Render.com)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) and sign up/log in
3. Click **New → Web Service**
4. Connect your GitHub repo
5. Render auto-detects `render.yaml` — just click **Deploy**
6. Your proxy is live at `https://nexproxy-xxxx.onrender.com` 🎉

> **Tip:** For a custom domain, add it in Render's settings under "Custom Domains".

## Tech Stack
- [Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet) — proxy engine
- [bare-server-node](https://github.com/tomphttp/bare-server-node) — transport layer
- [Express](https://expressjs.com) — HTTP server
