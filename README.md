# Brand Voice & Audience Profile Dashboard

> **Note:** This was built in under 30 minutes as a live demo for a client presentation — deployed and embedded directly into a Canva slide to show what a real product intake form could look like.

---

## What This Is

A sample HTML dashboard that captures brand identity inputs from a client: voice/tone, colors, typography, logo, and product categories. It's a standalone single-page app with zero backend — just a static HTML form with vanilla JavaScript.

This was created as part of a school client presentation to demonstrate how quickly a working prototype can go from idea → deployed URL, using AI-assisted development.

---

## Tech Stack

- **Frontend:** Plain HTML, CSS, JavaScript (no frameworks)
- **Server:** Node.js + Express (serves the static HTML)
- **Hosting:** [Railway](https://railway.app)

---

## Deploy to Railway

### Option 1 — Railway Dashboard (easiest)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select the repo — Railway auto-detects Node.js and deploys
4. Your live URL appears in the Railway dashboard within ~60 seconds

### Option 2 — Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy from this folder
railway init
railway up
```

---

## Run Locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
brand-voice-dashboard/
├── public/
│   └── index.html       # The entire dashboard (self-contained)
├── server.js            # Express server — serves the public folder
├── package.json
├── railway.json         # Railway deployment config
└── README.md
```

---

## Embedding in Canva

Once deployed, copy the live Railway URL and use Canva's **Embed** element (or an iframe embed in a Canva website) to drop the live dashboard directly into your presentation slide.

> Built April 2026 · CNU · Client Presentation Demo
