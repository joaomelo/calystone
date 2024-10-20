import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

const pathTo = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    build: {
      assetsDir: ".",
      emptyOutDir: true,
      outDir: "../dist",
      sourcemap: true,
    },
    envDir: "../",
    plugins: [
      vue(),
      checker({
        eslint: {
          lintCommand: "eslint",
          useFlatConfig: true
        },
        overlay: {
          initialIsOpen: false
        },
        vueTsc: true
      })
    ],
    publicDir: "../assets",
    resolve: {
      alias: {
        "@control": pathTo("./control"),
        "@data": pathTo("./data"),
        "@display": pathTo("./display"),
        "@domain": pathTo("./domain"),
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
      exclude: ["../node_modules/**", "../.legacy/**", "../e2e/**"],
      include: ["../**/*.test.ts"],
    },
  };
});
