import { createApp } from "vue";
import { Driver, I18n, Auth } from "@lib";
import { Artifacts } from "@body";
import { createRouter, messages } from "@view";
import { Pilot } from "@pilot";
import App from "./app.vue";

export function initApp(elementId) {
  const app = createApp(App);

  const i18n = new I18n({ locale: navigator.language, messages });
  app.use(i18n);

  const router = createRouter();
  app.use(router);

  const connection = createConnectionFromEnv();
  const driver = new Driver(connection);
  const artifacts = new Artifacts(driver);
  const auth = new Auth(driver);

  const pilot = new Pilot({ auth, router, artifacts });
  app.use(pilot);
  window.$pilot = pilot;

  app.mount(elementId);

  pilot.start();
}

function createConnectionFromEnv() {
  if (
    typeof import.meta.env.VITE_API_KEY !== "string" ||
    typeof import.meta.env.VITE_AUTH_DOMAIN !== "string" ||
    typeof import.meta.env.VITE_PROJECT_ID !== "string" ||
    typeof import.meta.env.VITE_STORAGE_BUCKET !== "string" ||
    typeof import.meta.env.VITE_MESSAGING_SENDER_ID !== "string" ||
    typeof import.meta.env.VITE_APP_ID !== "string" ||
    typeof import.meta.env.VITE_MEASUREMENT_ID !== "string"
  ) {
    throw new Error(
      "One or more of the environment variables for the service driver connection where not loaded properly"
    );
  }

  return {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
}
