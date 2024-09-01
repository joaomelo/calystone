import { createRouter } from "@display/router";
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
      options: {
        cssLayer: {
          name: "primevue",
          order: "tailwind-base, primevue, tailwind-utilities"
        }
      },
      preset: Aura
    }
  });

  const router = createRouter();
  app.use(router);

  app.mount(elementId);
}
