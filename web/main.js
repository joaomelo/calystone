import { createApp } from "vue";
import { createDb, Artifacts } from "@body";
import { I18n } from "@web/i18n";
import { createStore } from "@web/store";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId) {
  const app = createApp(App);

  const db = createDb({ type: "in-memory", loadDelay: 3 });
  window.$db = db;

  const artifacts = new Artifacts(db);

  const store = createStore({ db, artifacts });
  window.$store = store;
  app.use(store);

  const i18n = new I18n(navigator.navigate);
  app.use(i18n);

  app.mount(elementId);
}
