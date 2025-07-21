/* eslint-disable import-x/no-named-as-default */
/* eslint-disable import-x/no-nodejs-modules */
import vue from "@vitejs/plugin-vue";
import {
  fileURLToPath,
  URL
} from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";

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
      VitePWA({
        devOptions: { enabled: false },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          description: "calystone helps you organize your life through your file system with features like note taking and task management",
          icons: [
            {
              sizes: "192x192",
              src: "icon-192x192.png",
              type: "image/png"
            },
            {
              sizes: "512x512",
              src: "icon-512x512.png",
              type: "image/png"
            },
            {
              purpose: "any",
              sizes: "512x512",
              src: "icon-512x512.png",
              type: "image/png"
            },
            {
              purpose: "maskable",
              sizes: "512x512",
              src: "mask-icon.png",
              type: "image/png"
            }
          ],
          name: "calystone",
          short_name: "calystone",
          theme_color: "#ffffff"
        },
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          maximumFileSizeToCacheInBytes: 5_000_000
        }
      }),
      checker({
        eslint: {
          lintCommand: "eslint",
          useFlatConfig: true
        },
        overlay: { initialIsOpen: false },
        vueTsc: true
      }),
    ],
    publicDir: pathBasedOnRootStartinAtProject("assets"),
    resolve: { alias: { "@": pathBasedOnCofingStartingAtProject("app"), }, },
    root,
    server: {
      port: 8081,
      strictPort: true,
    },
    test: {
      environment: "jsdom",
      exclude: pathsBasedOnRootStartinAtProject(["node_modules/**", ".legacy/**", "e2e/**"]),
      include: pathsBasedOnRootStartinAtProject(["app/**/*.test.ts"]),
      setupFiles: pathBasedOnRootStartinAtProject("vitest.setup.ts"),
    },
  };
});
