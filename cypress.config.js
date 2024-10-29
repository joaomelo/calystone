import { defineConfig } from "cypress";

export default defineConfig({
  downloadsFolder: "e2e/downloads",
  e2e: {
    baseUrl: "http://localhost:8081",
    experimentalRunAllSpecs: true,
    specPattern: "e2e/specs/**/*.cy.ts",
    supportFile: false,
  },
  fixturesFolder: "e2e/fixtures",
  screenshotsFolder: "e2e/screenshots",
  videosFolder: "e2e/videos",
});
