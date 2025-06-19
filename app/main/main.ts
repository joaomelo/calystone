import { name, version } from "@/../package.json";
import { createI18n, createRouter, Store, ThemePreset } from "@/display"; // this will also apply the css styles as a side effect
import { AccessAdaptersFactory, AvailabilityFacade, BrowserExportAdapter, BrowserShareAdapter } from "@/infra";
import { ServicesPortolfio } from "@/services";
import { LoggerContainer, throwCritical, ToastService } from "@/utils";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";

import App from "./app.vue";

export function initApp(elementId: string) {
  const loggerLevel = numberOrUndefined(import.meta.env.VITE_LOGGER_LEVEL);
  const logger = LoggerContainer.create(loggerLevel);
  window.$logger = logger;

  if (typeof name !== "string" || typeof version !== "string") {
    throwCritical("INVALID_PACKAGE_JSON");
  }
  const appData = { name, version };
  logger.info(`${name} v${version}`);

  const app = createApp(App);

  app.use(PrimeVue, {
    theme: {
      preset: ThemePreset
    }
  });
  app.use(ToastService);

  app.directive("tooltip", {
    ...Tooltip,
    beforeUnmount() {
      const tooltips = document.querySelectorAll(".p-tooltip");
      tooltips.forEach(tooltip => { tooltip.remove(); });
    }
  });

  const router = createRouter();
  app.use(router);

  const dropboxClientId = stringOrUndefined(import.meta.env.VITE_DROPBOX_CLIENT_ID);
  const dropboxRedirectUrl = `${window.location.origin}/transfer-dropbox`;
  const memoryDelayInMilliseconds = asNumber(import.meta.env.VITE_MEMORY_DELAY_IN_MILLISECONDS);
  const memoryEnabled = asBoolean(import.meta.env.VITE_ENABLE_MEMORY);
  const oneDriveClientId = stringOrUndefined(import.meta.env.VITE_ONE_DRIVE_CLIENT_ID);
  const oneDriveRedirectUrl = `${window.location.origin}/transfer-one-drive`;

  const accessConfiguration = {
    dropbox: typeof dropboxClientId === "string" ? { clientId: dropboxClientId, redirectUrl: dropboxRedirectUrl } : undefined,
    memory: memoryEnabled ? { delayInMilliseconds: memoryDelayInMilliseconds } : undefined,
    oneDrive: typeof oneDriveClientId === "string" ? { clientId: oneDriveClientId, redirectUrl: oneDriveRedirectUrl } : undefined,
  };
  const accessAdaptersFactory = new AccessAdaptersFactory(accessConfiguration);

  const availabilityOptions = {
    dropbox: typeof dropboxClientId === "string",
    memory: memoryEnabled,
    oneDrive: typeof oneDriveClientId === "string",
  };
  const availabilityFacade = new AvailabilityFacade(availabilityOptions);

  const shareAdapter = new BrowserShareAdapter();
  const exportAdapter = new BrowserExportAdapter();

  const servicesPortolfio = new ServicesPortolfio({
    accessAdaptersFactory,
    availabilityFacade,
    exportAdapter,
    shareAdapter,
  });

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

function numberOrUndefined(value: unknown): number | undefined {
  if (value === undefined || value === null) return undefined;
  return asNumber(value);
}

function stringOrUndefined(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  return undefined;
}