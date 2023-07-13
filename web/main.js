import { createApp } from "vue";
import { Firebase, I18n, globalize } from "../lib";
import { Auth, Projects, Community } from "../body";
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
  const driver = new Firebase(config);
  const community = new Community(driver);
  const auth = new Auth({ driver, community });
  const projects = new Projects({ driver, auth, community });

  const i18n = new I18n(messages);
  i18n.locale = navigator.navigate;

  const globals = globalize({
    i18n,
    auth,
    projects,
    community,
  });

  const router = createRouter();

  const app = createApp(App);
  app.use(globals);
  app.use(router);
  app.mount(elementId);
}
