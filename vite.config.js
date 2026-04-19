import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // VITE_BASE is set to the repo name when building for GitHub Pages,
  // left unset (defaults to "/") for Railway / Vercel
  base: process.env.VITE_BASE || "/",
  build: {
    outDir: "dist",
  },
});
