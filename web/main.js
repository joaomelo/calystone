import { createApp } from "vue";
import { Firebase, Auth, Dataset, I18n, globalize } from "../lib";
import { Brother, Gatekeeper, Shepherd, Hostess, Strategist } from "../body";
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
  const usersDataset = new Dataset({ name: "users", db, auth });
  const invitesDataset = new Dataset({ name: "invites", db, auth });
  const programsDataset = new Dataset({ name: "programs", db, auth });

  const shepherd = new Shepherd({ usersDataset });
  const gatekeeper = new Gatekeeper({ auth, shepherd });
  const hostess = new Hostess({ gatekeeper, invitesDataset, programsDataset });
  const strategist = new Strategist({ gatekeeper, programsDataset });
  const brother = new Brother({
    gatekeeper,
    programsDataset,
    invitesDataset,
    usersDataset,
  });

  const i18n = new I18n(messages);
  i18n.locale = navigator.navigate;

  const globals = globalize({
    i18n,
    brother,
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

  window.$brother = brother;
}
