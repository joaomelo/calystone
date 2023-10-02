import { createApp } from "vue";
import { Service } from "@service";
import { I18n } from "@view/i18n";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
  const app = createApp(App);

  const service = new Service({ plugin: "memory", loadDelay: 1 });
  window.$service = service;
  app.use(service);

  const i18n = new I18n(navigator.navigate);
  app.use(i18n);

  app.mount(elementId);
}
