import { createApp } from "vue";
import { Driver } from "@service";
import { I18n } from "@view/i18n";
import { Artifacts } from "@body";
import App from "./app.vue";
import "./styles";

export async function initApp(elementId: string) {
  const app = createApp(App);

  const connection = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  const driver = new Driver({ connection });
  const artifacts = new Artifacts(driver);
  app.use(artifacts);

  const i18n = new I18n(navigator.language);
  app.use(i18n);

  app.mount(elementId);

  (window as any)["$driver"] = driver;
}
