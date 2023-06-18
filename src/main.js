import { createApp } from "vue";
import { I18n, ProjectsService, Auth } from "./services";
import { router } from "./pages";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const i18n = new I18n(navigator.navigate);
  const auth = new Auth();
  const projects = new ProjectsService(auth);
  const store = {
    i18n,
    auth,
    projects,
  };

  const app = createApp(App);
  app.provide("store", store);
  app.use(router);
  app.mount(elementId);

  window.$store = store;
}
