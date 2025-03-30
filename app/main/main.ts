import { name, version } from "@/../package.json";
import { createI18n, createRouter, Store, ThemePreset } from "@/display"; // this will also apply the css styles as a side effect
import { BaseSourceAdapterPortfolio } from "@/infra";
import { ServicesPortolfio } from "@/services";
import { ToastService } from "@/utils";
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
      delayInSeconds: asNumber(import.meta.env.VITE_MEMORY_DELAY_IN_SECONDS),
      enabled: asBoolean(import.meta.env.VITE_ENABLE_MEMORY),
    },
    oneDrive: {
      clientId: stringOrUndefined(import.meta.env.VITE_ONE_DRIVE_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-one-drive`,
    },
  };
  const sourceAdapterPortfolio = new BaseSourceAdapterPortfolio(options);
  const servicesPortolfio = new ServicesPortolfio(sourceAdapterPortfolio);

  const store = new Store({ appData, services: servicesPortolfio });
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

function asNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return 0;
}

function stringOrUndefined(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  return undefined;
}