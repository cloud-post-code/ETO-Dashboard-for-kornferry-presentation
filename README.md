# ETO Dashboard — Korn Ferry Client Presentation

> **Built in under 30 minutes.** Instead of dropping a static screenshot into our Canva deck, we deployed a live, functional demo and embedded it directly into the slide — so the audience could interact with the actual product during the pitch.

---

## The Pitch Context

This dashboard was built to support a school client presentation pitching **ETO (Estimated Time to Offer)** as a core metric for Korn Ferry's talent acquisition workflow.

The argument: ETO gives recruiting teams a single, trackable number that connects brand positioning, audience targeting, and offer conversion — cutting the guesswork out of how long it takes to get from sourcing to signed offer.

Rather than showing a static mockup or wireframe to illustrate what a client intake tool could look like, we deployed a real working dashboard to Railway, got a live public URL, and **embedded it as a functional iframe inside the Canva presentation**. The panel was fully interactive during the actual presentation — the audience could click through it in real time on screen.

This was a deliberate choice: showing a live product is a stronger signal than showing a picture of one.

---

## Tech Stack

- **Frontend:** Plain HTML, CSS, Vanilla JavaScript (no frameworks, no build step)
- **Server:** Node.js + Express (serves the static HTML file)
- **Hosting:** [Railway](https://railway.app)
- **Presentation:** Canva (embedded via iframe/website embed element)

---

## Deploy to Railway

### Option 1 — Railway Dashboard (easiest)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select this repo — Railway auto-detects Node.js and deploys
4. Copy the live `*.up.railway.app` URL — it's ready to embed in ~60 seconds

### Option 2 — Railway CLI

```bash
npm install -g @railway/cli
railway login
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
ETO-Dashboard-for-kornferry-presentation/
├── public/
│   └── index.html       # The full dashboard — self-contained, no dependencies
├── server.js            # Express server that serves the public folder
├── package.json
├── railway.json         # Railway deployment config
└── README.md
```

---

## Embedding in Canva

1. Deploy to Railway and grab the public URL
2. In Canva, add an **Embed** element (or use a Canva Websites page)
3. Paste the Railway URL — the live dashboard renders directly inside the slide
4. During the presentation, it's fully interactive — not a screenshot

---

> Built April 2026 · CNU · Korn Ferry Client Presentation
> Pitching ETO as a measurable talent acquisition metric
