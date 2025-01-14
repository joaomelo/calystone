import { createI18n, createRouter, Store, ThemePreset, ToastService } from "@/display"; // this will also apply the css styles as a side effect
import { name, version } from "@/../package.json";
import { Nodes } from "@/domain";
import { LocalStorageLocaleRepository, NodesService } from "@/infra";
import { Configuration } from "@/utils";
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

  const configuration = new Configuration({
    enableMemory: import.meta.env.VITE_ENABLE_MEMORY ?? false,
    name,
    oneDriveClientId: import.meta.env.VITE_ONE_DRIVE_CLIENT_ID ?? null,
    oneDriveRedirectUrl: `${window.location.origin}/bootstrap?source=onedrive`,
    version,
  });
  const nodes = new Nodes();
  const nodesService = new NodesService(nodes, configuration);

  const store = new Store({ configuration, nodes, nodesService, router });
  window.$store = store;
  app.use(store);

  const localeRepository = new LocalStorageLocaleRepository();
  const i18n = createI18n(localeRepository);
  app.use(i18n);

  app.mount(elementId);
}
