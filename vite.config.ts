import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import vueDevTools from "vite-plugin-vue-devtools";

const root = "./app/main";
const pathBasedOnRootStartinAtProject = (path: string) => "../../" + path;
const pathsBasedOnRootStartinAtProject = (paths: string[]) => paths.map(pathBasedOnRootStartinAtProject);
const pathBasedOnCofingStartingAtProject = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    build: {
      assetsDir: ".",
      emptyOutDir: true,
      outDir: pathBasedOnRootStartinAtProject("dist"),
      sourcemap: true,
    },
    envDir: pathBasedOnRootStartinAtProject(""),
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
      }),
      vueDevTools(),
    ],
    publicDir: pathBasedOnRootStartinAtProject("app/display/assets"),
    resolve: {
      alias: {
        "@": pathBasedOnCofingStartingAtProject("app"),
      },
    },
    root,
    server: {
      port: 8081,
      strictPort: true,
    },
    test: {
      exclude: pathsBasedOnRootStartinAtProject(["node_modules/**", ".legacy/**", "e2e/**"]),
      include: pathsBasedOnRootStartinAtProject(["app/**/*.test.ts"]),
    },
  };
});
