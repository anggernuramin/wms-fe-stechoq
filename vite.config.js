import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    define: {
      // Menetapkan semua variabel lingkungan ke dalam konfigurasi define
      "process.env": process.env,
    },
  },
});
