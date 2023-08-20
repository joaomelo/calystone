import { createApp } from "vue";
import { Service, I18n, globalize } from "../lib";
import { Users, Invites, Programs, Artifacts } from "../body";
import { messages } from "./i18n";
import { createRouter } from "./router";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
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
  service.load({ name: "programs" });
  service.load({ name: "artifacts" });

  const users = new Users(service);
  const invites = new Invites(service);
  const programs = new Programs(service);
  const artifacts = new Artifacts(service);

  const i18n = new I18n(messages);
  i18n.locale = navigator.navigate;

  const globals = globalize({
    i18n,
    programs,
    users,
    invites,
    artifacts,
  });

  const router = createRouter();

  const app = createApp(App);
  app.use(globals);
  app.use(router);
  app.mount(elementId);

  window.$data = { programs, users, invites, artifacts };
}
