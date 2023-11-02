import { createApp } from "vue";
import { Driver } from "@service";
import { Display, I18n } from "@view";
import { Pilot } from "@pilot";
import App from "./app.vue";

export function initApp(elementId: string) {
  const app = createApp(App);

  const display = new Display(app);
  const connection = createConnectionFromEnv();
  const driver = new Driver(connection);
  const pilot = new Pilot({ driver, display });
  app.provide("pilot", pilot);

  const i18n = new I18n(navigator.language);
  app.use(i18n);

  app.mount(elementId);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  (window as any)["$pilot"] = pilot;
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
