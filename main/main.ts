import { createRouter } from "@display"; // this will also import the css styles
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

  app.mount(elementId);
}
