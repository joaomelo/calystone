import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081",
    experimentalRunAllSpecs: true,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
