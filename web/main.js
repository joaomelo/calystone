import { createApp } from "vue";
import { Service, I18n } from "@lib";
import { messages } from "./i18n";
import { createRouter } from "./router";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
  const app = createApp(App);

  const serviceConnection = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  const service = new Service(serviceConnection);
  service.load({ name: "users" });
  service.load({ name: "invites" });
  service.load({ name: "artifacts" });
  app.use(service);
  window.$service = service;

  const i18n = new I18n(messages);
  i18n.updateLocale(navigator.navigate);
  app.use(i18n);

  const router = createRouter();
  app.use(router);

  app.mount(elementId);
}
