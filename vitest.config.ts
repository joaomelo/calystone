import { defineConfig } from "vitest/config";

import {
  aliasAtProject,
  cacheDir,
  projectRoot,
  sharedPlugins
} from "./vite.shared";

const isCI = process.env.VITEST_MODE === "ci";

export default defineConfig({
  cacheDir,
  envDir: projectRoot,
  plugins: [...sharedPlugins()],
  resolve: { alias: aliasAtProject },
  root: projectRoot,
  test: {
    coverage: {
      provider: "v8",
      reportsDirectory: "./reports/coverage"
    },
    environment: "jsdom",
    exclude: ["node_modules/**", ".legacy/**", "e2e/**", "summary/**"],
    include: ["app/**/*.test.ts"],
    outputFile: { json: "./reports/vitest-results.json" },
    reporters: isCI ? ["dot", "json"] : ["default"],
  }
});
