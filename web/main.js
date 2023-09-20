import { createApp, reactive } from "vue";
import { I18n } from "@lib";
import { messages } from "./i18n";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
  const app = createApp(App);

  const store = reactive({});
  app.provide("store", store);

  const i18n = new I18n(messages);
  i18n.updateLocale(navigator.navigate);
  app.use(i18n);

  app.mount(elementId);
}
