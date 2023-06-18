import { createApp } from "vue";
import { I18n, Projects, Auth } from "./services";
import { router } from "./pages";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const store = {
    i18n: new I18n(navigator.navigate),
    auth: new Auth(),
    projects: new Projects(),
  };
  const app = createApp(App);
  app.provide("store", store);
  app.use(router);
  app.mount(elementId);

  window.$store = store;
}
