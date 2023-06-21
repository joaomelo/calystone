import { createApp } from "vue";
import { I18n, ProjectsService, Auth } from "./services";
import { router } from "./pages";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const i18n = new I18n(navigator.navigate);
  const auth = new Auth();
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
