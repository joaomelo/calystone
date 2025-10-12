import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";

import {
  aliasAtProject,
  appRoot,
  cacheDir,
  projectRoot,
  resolveAtProject,
  sharedPlugins
} from "./vite.shared";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  const isProd = command === "build";

  const conditionalPlugins = [];
  if (isDev) {
    conditionalPlugins.push(checker({
      eslint: {
        lintCommand: "eslint",
        useFlatConfig: true
      },
      overlay: { initialIsOpen: false },
      vueTsc: true
    }));
  }

  if (isProd) {
    conditionalPlugins.push(visualizer({
      brotliSize: true,
      filename: "reports/bundle-report.html",
      gzipSize: true,
      open: false,
      template: "treemap"
    }));
  }

  return {
    build: {
      assetsDir: ".",
      emptyOutDir: true,
      outDir: resolveAtProject("dist"),
      sourcemap: true,
    },
    cacheDir,
    envDir: projectRoot,
    plugins: [
      ...sharedPlugins(),
      ...conditionalPlugins,
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
      })
    ],
    preview: {
      port: 4173,
      strictPort: true
    },
    publicDir: resolveAtProject("assets"),
    resolve: { alias: aliasAtProject, },
    root: appRoot,
    server: {
      port: 8081,
      strictPort: true,
    },
  };
});
