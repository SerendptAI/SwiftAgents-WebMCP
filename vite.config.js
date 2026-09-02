import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_SERVER = process.env.API_SERVER || "http://localhost:8001";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: API_SERVER, changeOrigin: true },
    },
  },
});
