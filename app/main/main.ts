import { name, version } from "@/../package.json";
import { createI18n, createRouter, Store, ThemePreset, ToastService } from "@/display"; // this will also apply the css styles as a side effect
import { BaseAdaptersPortfolio } from "@/infra";
import { ServicesPortolfio } from "@/services";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";

import App from "./app.vue";

export function initApp(elementId: string) {
  if (typeof name !== "string" || typeof version !== "string") throw new Error("Invalid package.json");
  const appData = { name, version };
  console.info(`${name} v${version}`);

  const app = createApp(App);

  app.use(PrimeVue, {
    theme: {

      preset: ThemePreset
    }
  });
  app.use(ToastService);
  app.directive("tooltip", Tooltip);

  const router = createRouter();
  app.use(router);

  const options = {
    dropbox: {
      clientId: stringOrUndefined(import.meta.env.VITE_DROPBOX_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-dropbox`,
    },
    memory: {
      enabled: asBoolean(import.meta.env.VITE_ENABLE_MEMORY)
    },
    oneDrive: {
      clientId: stringOrUndefined(import.meta.env.VITE_ONE_DRIVE_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-one-drive`,
    },
  };
  const AdaptersPortfolio = new BaseAdaptersPortfolio(options);
  const servicesPortolfio = new ServicesPortolfio(AdaptersPortfolio);

  const store = new Store({ appData, service: servicesPortolfio });
  window.$store = store;
  app.use(store);

  const i18n = createI18n();
  app.use(i18n);

  app.mount(elementId);
}

function asBoolean(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value === "false") return false;
  return Boolean(value);
}

function stringOrUndefined(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  return undefined;
}