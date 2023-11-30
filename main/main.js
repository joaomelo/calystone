import { createApp } from "vue";
import { name, version } from "@main/../package.json";
import {
  Driver,
  I18n,
  MutatorFirestoreAdapter,
  SelectFirestoreAdapter,
  Auth,
} from "@lib";
import { Body } from "@body";
import { Display } from "@view/display";
import { messages } from "@view/messages";
import App from "./app.vue";

export function initApp(elementId) {
  console.info(`${name} v${version}`);

  const app = createApp(App);

  const i18n = new I18n({ locale: navigator.language, messages });
  app.use(i18n);

  const display = new Display();
  app.use(display);

  const connection = createConnectionFromEnv();
  const driver = new Driver(connection);
  const mutatorAdapter = new MutatorFirestoreAdapter(driver);
  const selectAdapter = new SelectFirestoreAdapter(driver);
  const auth = new Auth(driver);

  const body = new Body({ mutatorAdapter, selectAdapter, auth });

  app.use(body);
  window.$body = body;

  app.mount(elementId);

  display.pageSolve();
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
