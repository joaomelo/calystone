import { createApp } from "vue";
import { AppDriver, I18n, ProjectsService, Auth } from "../../body";
import { router } from "./pages";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
  console.log({ firebaseConfig });
  const driver = AppDriver(firebaseConfig);
  const auth = new Auth(driver.auth);

  const i18n = new I18n(navigator.navigate);
  const projects = new ProjectsService(auth);
  const globals = {
    i18n,
    auth,
    projects,
  };

  const app = createApp(App);
  app.provide("globals", globals);
  app.use(router);
  app.mount(elementId);

  window.$globals = globals;
}
