import { qwikVite } from "@builder.io/qwik/optimizer";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [qwikVite()],
    build: {
      lib: {
        entry: "./src/index.ts",
        fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
        formats: ["es", "cjs"],
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
