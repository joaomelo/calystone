import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pathTo = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [vue()],
    root: "./view",
    envDir: "../",
    resolve: {
      alias: {
        "@body": pathTo("./body"),
        "@service": pathTo("./service"),
        "@shared": pathTo("./shared"),
        "@view": pathTo("./view"),
      },
    },
    build: {
      outDir: "../dist-view",
      assetsDir: ".",
      emptyOutDir: true,
      sourcemap: true,
    },
    test: {
      include: ["../**/*.test.js"],
    },
  };
});
