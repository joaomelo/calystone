import { createApp } from "vue";
import { I18n, Projects } from "./services";
import { router } from "./router";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const store = {
    i18n: new I18n(navigator.navigate),
    projects: new Projects(),
  };
  const app = createApp(App);
  app.provide("store", store);
  app.use(router);
  app.mount(elementId);

  window.$store = store;
}
