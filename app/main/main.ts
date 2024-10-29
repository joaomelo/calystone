import { createI18n, createRouter } from "@/display"; // this will also apply the css styles as a side effect
import { name, version } from "@/../package.json";
import { Store } from "@/domain";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";

import App from "./app.vue";

export function initApp(elementId: string) {
  if (typeof name !== "string" || typeof version !== "string") throw new Error("Invalid package.json");

  console.info(`${name} v${version}`);

  const app = createApp(App);

  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });
  app.directive("tooltip", Tooltip);

  const router = createRouter();
  app.use(router);

  const i18n = createI18n();
  app.use(i18n);

  const store = new Store();
  window.$store = store;
  app.use(store);

  app.mount(elementId);
}
