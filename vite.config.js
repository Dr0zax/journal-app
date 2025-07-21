import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        journal: resolve(__dirname, "src/journal/journal.html"),
        entry: resolve(__dirname, "src/entry/entry.html"),
        entries: resolve(__dirname, "src/entries/entries.html"),
        register: resolve(__dirname, "src/register.html"),
        login: resolve(__dirname, "src/login.html"),
      },
    },
  },
});
