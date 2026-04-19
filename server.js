const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Force iframe-embedding headers on every response before anything else.
// This overrides any proxy-level X-Frame-Options (e.g. Railway's edge).
app.use((req, res, next) => {
  // Explicitly delete X-Frame-Options so no upstream proxy value leaks through
  res.removeHeader("X-Frame-Options");
  res.removeHeader("x-frame-options");

  // Allow framing from any origin — covers Canva, Notion, Google Sites, etc.
  res.setHeader("Content-Security-Policy", "frame-ancestors *");

  // Open CORS so Canva's renderer can fetch assets
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  // Re-assert headers on the HTML response specifically
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`ETO Dashboard running on port ${PORT}`);
});
