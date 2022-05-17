import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    proxy: {
      "^/api|/user": {
        // All requests to this domain must be made to localhost instead.
        target: "https://op.digesto.com.br",
        // To avoid CORS error (the sole reason why we are even using this proxy).
        changeOrigin: true,
        followRedirects: true, // API redirects on login.
      },
    },
  },
});
