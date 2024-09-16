import { createI18n, createRouter } from "@display"; // this will also apply the css styles
import { createStore, provideStore } from "@data";
import { name, version } from "@main/../package.json";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "./app.vue";

export function initApp(elementId: string) {
  console.info(`${name} v${version}`);

  const app = createApp(App);

  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });

  const router = createRouter();
  app.use(router);

  const i18n = createI18n();
  app.use(i18n);

  const store = createStore();
  window.$store = store;
  provideStore(store, app);

  app.mount(elementId);
}
