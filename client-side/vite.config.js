import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API routes to backend
      "/api/auth": "http://localhost:8800",
      "/api/users": "http://localhost:8800",
      "/api/hotels": "http://localhost:8800",
      "/api/rooms": "http://localhost:8800",
    },
  },
});
