import { createApp, reactive } from "vue";
import { createDb } from "@db";
import { I18n } from "@web/i18n";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
  const app = createApp(App);

  const db = createDb();
  app.provide("db", db);
  window.$db = db;

  const store = reactive({});
  app.provide("store", store);

  const i18n = new I18n(navigator.navigate);
  app.use(i18n);

  app.mount(elementId);
}
