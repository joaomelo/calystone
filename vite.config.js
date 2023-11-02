import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import vue from "@vitejs/plugin-vue";

const pathTo = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [vue(), checker({ vueTsc: true, root: "../" })],
    root: "./main",
    envDir: "../",
    resolve: {
      alias: {
        "@body": pathTo("./body"),
        "@pilot": pathTo("./pilot"),
        "@main": pathTo("./main"),
        "@service": pathTo("./service"),
        "@shared": pathTo("./shared"),
        "@view": pathTo("./view"),
      },
    },
    build: {
      outDir: "../dist",
      assetsDir: "../view/assets",
      emptyOutDir: true,
      sourcemap: true,
    },
    test: {
      include: ["../**/*.test.ts"],
    },
  };
});
