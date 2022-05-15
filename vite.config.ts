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
  server: {
    proxy: {
      "^/api|/user": {
        target: "https://op.digesto.com.br",
        changeOrigin: true,
        headers: {
          Authorization: "Bearer 5af8ba4c-43e3-4361-9e9c-f73458ab6a5b",
        },
        followRedirects: true,
      },
    },
  },
});
