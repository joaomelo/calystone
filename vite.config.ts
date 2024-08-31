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
        vueTsc: true,        
      })
    ],
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
