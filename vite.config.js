import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const pathTo = path => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    build: {
      assetsDir: ".",
      emptyOutDir: true,
      outDir: "../dist",
      sourcemap: true,
    },
    envDir: "../",
    plugins: [vue()],
    publicDir: "../assets",
    resolve: {
      alias: {
        "@data": pathTo("./data"),
        "@display": pathTo("./display"),
        "@lib": pathTo("./lib"),
        "@main": pathTo("./main"),
      },
    },
    root: "./main",
    server: {
      port: 8081,
      strictPort: true,
    },
    test: {
      include: ["../**/*.test.js"],
    },
  };
});
