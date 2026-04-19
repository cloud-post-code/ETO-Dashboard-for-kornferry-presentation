const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow this app to be embedded as an iframe from any origin (Canva, etc.)
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`ETO Dashboard running on port ${PORT}`);
});
