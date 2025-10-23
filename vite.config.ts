import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'fs';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // server: {
  //   host: '127.0.0.1', // Force IPv4 instead of ::1 (IPv6)
  //   port: 8080,        // You can change this if needed
  //   open: true,        // Automatically open browser
  //   strictPort: true,  // Fail fast if port is in use (optional)
  //   https: {
  //     key: fs.readFileSync('C:/Users/Reinhard/localhost-key.pem'),
  //     cert: fs.readFileSync('C:/Users/Reinhard/localhost.pem'),
  //   },
  // },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
  },
});
