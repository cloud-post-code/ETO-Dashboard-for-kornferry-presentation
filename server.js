const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Disable Express's default X-Powered-By header
app.disable("x-powered-by");

// Iframe / embedding headers — applied to EVERY response before anything else
app.use((req, res, next) => {
  // Belt-and-suspenders: remove AND re-set to ensure no upstream value survives
  res.removeHeader("X-Frame-Options");
  res.removeHeader("x-frame-options");

  // frame-ancestors * tells every modern browser framing from any origin is allowed
  res.setHeader("Content-Security-Policy", "frame-ancestors *");

  // Some older embed checkers (including some Canva validators) still look for
  // the legacy ALLOWALL value rather than the CSP header
  res.setHeader("X-Frame-Options", "ALLOWALL");

  // Full CORS so Canva's renderer can fetch JS / CSS assets cross-origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Debug endpoint — visit /debug-headers in browser to confirm what's being sent
app.get("/debug-headers", (req, res) => {
  res.json({
    headers_sent: {
      "X-Frame-Options": res.getHeader("X-Frame-Options"),
      "Content-Security-Policy": res.getHeader("Content-Security-Policy"),
      "Access-Control-Allow-Origin": res.getHeader("Access-Control-Allow-Origin"),
    },
    note: "If X-Frame-Options is ALLOWALL and CSP shows frame-ancestors *, embedding should work."
  });
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`ETO Dashboard running on port ${PORT}`);
});
