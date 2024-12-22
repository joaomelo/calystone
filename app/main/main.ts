import { createI18n, createRouter, State, ThemePreset, ToastService } from "@/display"; // this will also apply the css styles as a side effect
import { name, version } from "@/../package.json";
import { Ignore } from "@/domain";
import { LocalStorageIgnoreRepository } from "@/repositories";
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      preset: ThemePreset
    }
  });
  app.use(ToastService);
  app.directive("tooltip", Tooltip);

  const router = createRouter();
  app.use(router);

  const ignoreRepository = new LocalStorageIgnoreRepository();
  const ignore = new Ignore(ignoreRepository);

  const state = new State({ ignore, router });
  app.use(state);

  const i18n = createI18n();
  app.use(i18n);

  app.mount(elementId);
}
