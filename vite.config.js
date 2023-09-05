import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pathTo = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [vue()],
    root: "./web",
    envDir: "../",
    resolve: {
      alias: {
        "@body": pathTo("./body"),
        "@lib": pathTo("./lib"),
        "@web": pathTo("./web"),
      },
    },
    build: {
      outDir: "../dist-web",
      assetsDir: ".",
      emptyOutDir: true,
      sourcemap: true,
    },
    test: {
      include: ["../**/*.test.js"],
    },
  };
});
