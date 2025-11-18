import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { componentTagger } from "@devvai/devv-tagger-plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [componentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance for Cloudflare Pages
    target: "es2015",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          "chart-vendor": ["recharts"],
          "animation-vendor": ["framer-motion"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
})
