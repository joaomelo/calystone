import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

const root = "./app/main";
const pathBasedOnProject = (path: string) => "../../" + path;
const pathsBasedOnProject = (paths: string[]) => paths.map(pathBasedOnProject);

export default defineConfig(() => {
  return {
    build: {
      assetsDir: ".",
      emptyOutDir: true,
      outDir: pathBasedOnProject("dist"),
      sourcemap: true,
    },
    envDir: pathBasedOnProject(""),
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
    publicDir: pathBasedOnProject("app/display/assets"),
    resolve: {
      alias: {
        "@": "./app",
      },
    },
    root,
    server: {
      port: 8081,
      strictPort: true,
    },
    test: {
      exclude: pathsBasedOnProject(["node_modules/**", ".legacy/**", "e2e/**"]),
      include: pathsBasedOnProject(["app/**/*.test.ts"]),
    },
  };
});
