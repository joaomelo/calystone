import { createI18n, createRouter, Store, ThemePreset, ToastService } from "@/display"; // this will also apply the css styles as a side effect
import type { SourcesConfiguration } from "@/infra";

import { name, version } from "@/../package.json";
import { Nodes } from "@/domain";
import { LocalStorageLocaleRepository, NodesService } from "@/infra";
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      preset: ThemePreset
    }
  });
  app.use(ToastService);
  app.directive("tooltip", Tooltip);

  const router = createRouter();
  app.use(router);

  const sourcesConfiguration: SourcesConfiguration = {
    dropbox: {
      clientId: stringOrUndefined(import.meta.env.VITE_DROPBOX_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-dropbox`,
    },
    googleDrive: {
      clientId: stringOrUndefined(import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-google-drive`,
    },
    memory: {
      enabled: asBoolean(import.meta.env.VITE_ENABLE_MEMORY)
    },
    oneDrive: {
      clientId: stringOrUndefined(import.meta.env.VITE_ONE_DRIVE_CLIENT_ID),
      redirectUrl: `${window.location.origin}/transfer-one-drive`,
    },
  };
  const nodes = new Nodes();
  const nodesService = new NodesService({ data: sourcesConfiguration, nodes });

  const store = new Store({ appData, nodes, nodesService });
  window.$store = store;
  app.use(store);

  const localeRepository = new LocalStorageLocaleRepository();
  const i18n = createI18n(localeRepository);
  app.use(i18n);

  app.mount(elementId);
}

function stringOrUndefined(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  return String(value);
}

function asBoolean(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value === "false") return false;
  return Boolean(value);
}