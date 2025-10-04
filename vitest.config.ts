// vitest.config.ts
import { defineConfig } from "vitest/config";

import {
  aliasAtProject,
  projectRoot,
  sharedPlugins
} from "./configs";

const isCI = process.env.VITEST_MODE === "ci";

export default defineConfig({
  envDir: projectRoot,
  plugins: [...sharedPlugins()],
  resolve: { alias: aliasAtProject },
  root: projectRoot,
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", ".legacy/**", "e2e/**"],
    include: ["app/**/*.test.ts"],
    outputFile: { json: "./reports/vitest-results.json" },
    reporters: isCI ? ["dot", "json"] : ["default"],
  }
});
