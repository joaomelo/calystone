import { defineConfig } from "cypress";

export default defineConfig({
  downloadsFolder: "e2e/downloads",
  e2e: {
    baseUrl: "http://localhost:8081",
    experimentalRunAllSpecs: true,
    specPattern: "e2e/specs/**/*.cy.ts",
    supportFile: "e2e/support/commands.ts",
  },
  fixturesFolder: "e2e/fixtures",
  retries: {
    openMode: 0,
    runMode: 3,
  },
  screenshotsFolder: "e2e/screenshots",
  video: true,
  videosFolder: "e2e/videos",
});
