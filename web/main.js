import { createApp } from "vue";
import { Firebase, Auth, Dataset, I18n, globalize } from "../lib";
import { Gatekeeper, Shepherd, Hostess, Strategist } from "../body";
import { messages } from "./i18n";
import { createRouter } from "./router";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  const firebaseDriver = new Firebase(config);
  const auth = new Auth(firebaseDriver.app);

  const db = firebaseDriver.db;
  const users = new Dataset({ name: "users", db, auth });
  const invites = new Dataset({ name: "invites", db, auth });
  const programs = new Dataset({ name: "programs", db, auth });

  const shepherd = new Shepherd(users);
  const gatekeeper = new Gatekeeper({ auth, shepherd });
  const strategist = new Strategist({ programs, shepherd });
  const hostess = new Hostess({ invites, shepherd, gatekeeper, strategist });

  const i18n = new I18n(messages);
  i18n.locale = navigator.navigate;

  const globals = globalize({
    i18n,
    gatekeeper,
    strategist,
    shepherd,
    hostess,
  });

  const router = createRouter();

  const app = createApp(App);
  app.use(globals);
  app.use(router);
  app.mount(elementId);
}
