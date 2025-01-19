import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Alias for the `src` folder
    },
  },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true, // also necessary
    rollupOptions: {
      input: "index.html", // Ensure it starts from your index.html
    },
  },
});
