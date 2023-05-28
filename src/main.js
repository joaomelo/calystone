import { createApp } from "vue";
import { I18n } from "./services/i18n";
import { router } from "./router";
import App from "./app.vue";
import "./styles";

export function initApp(elementId) {
  const store = {
    i18n: new I18n(navigator.navigate),
  };
  const app = createApp(App);
  app.provide("store", store);
  app.use(router);
  app.mount(elementId);
}
