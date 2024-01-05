import { createApp } from "vue";
import { name, version } from "@main/../package.json";
import {
  Dependencies,
  FirebaseAuth,
  FirebaseDriver,
  FirestoreMutator,
  FirestoreSelector,
  I18n,
} from "@lib";
import { createRouter, messages } from "@view";
import App from "./app.vue";

export function initApp(elementId) {
  console.info(`${name} v${version}`);

  const app = createApp(App);

  const i18n = new I18n({ locale: navigator.language, messages });
  app.use(i18n);

  const start = window.location.pathname;
  const router = createRouter();
  app.use(router);

  const connection = createConnectionFromEnv();
  const driver = new FirebaseDriver(connection);
  const auth = new FirebaseAuth(driver.auth);
  const selector = new FirestoreSelector(driver.firestore);
  const mutator = new FirestoreMutator(driver.firestore);

  const dependencies = new Dependencies({
    start,
    router,
    auth,
    selector,
    mutator,
  });
  window.$dependencies = dependencies;
  app.use(dependencies);

  app.mount(elementId);
}

function createConnectionFromEnv() {
  if (import.meta.env.VITE_SERVER_PLATFORM === "emulators") {
    console.info("using firebase emulators");
    if (
      typeof import.meta.env.VITE_PROJECT_ID !== "string"
      || typeof import.meta.env.VITE_API_KEY !== "string"
      || typeof import.meta.env.VITE_APP_ID !== "string"
    ) {
      throw new Error(
        "One or more of the environment variables for the emulators connection where not loaded properly",
      );
    }
  }
  else {
    if (
      typeof import.meta.env.VITE_PROJECT_ID !== "string"
      || typeof import.meta.env.VITE_API_KEY !== "string"
      || typeof import.meta.env.VITE_APP_ID !== "string"
      || typeof import.meta.env.VITE_AUTH_DOMAIN !== "string"
      || typeof import.meta.env.VITE_STORAGE_BUCKET !== "string"
      || typeof import.meta.env.VITE_MESSAGING_SENDER_ID !== "string"
      || typeof import.meta.env.VITE_MEASUREMENT_ID !== "string"
    ) {
      throw new Error(
        "One or more of the environment variables for the service connection where not loaded properly",
      );
    }
  }

  return {
    serverPlatform: import.meta.env.VITE_SERVER_PLATFORM,
    projectId: import.meta.env.VITE_PROJECT_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
}
