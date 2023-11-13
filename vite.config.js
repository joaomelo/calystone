import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pathTo = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [vue()],
    root: "./main",
    publicDir: "../assets",
    envDir: "../",
    resolve: {
      alias: {
        "@body": pathTo("./body"),
        "@main": pathTo("./main"),
        "@pilot": pathTo("./pilot"),
        "@service": pathTo("./service"),
        "@lib": pathTo("./lib"),
        "@view": pathTo("./view"),
      },
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      sourcemap: true,
    },
    test: {
      include: ["../**/*.test.js"],
    },
  };
});
