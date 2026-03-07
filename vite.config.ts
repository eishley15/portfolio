import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: false, gzipSize: true, brotliSize: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/ogl")) return "vendor-ogl";
          if (id.includes("node_modules/gsap")) return "vendor-gsap";
          if (id.includes("node_modules/motion") || id.includes("node_modules/framer-motion"))
            return "vendor-motion";
          if (
            id.includes("node_modules/@mui") ||
            id.includes("node_modules/@emotion")
          )
            return "vendor-mui";
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/scheduler/")
          )
            return "vendor-react";
        },
      },
    },
  },
})