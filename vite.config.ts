import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    react(),
  ],
  resolve: {
    alias: {
      "@vercel/analytics/next": "@vercel/analytics/react",
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
