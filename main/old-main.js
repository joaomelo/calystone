import { Artifacts, Gatekeeper, Tags } from "@body";
import { Dependencies, FirebaseAuthAdapter, FirebaseDriver, FirestoreMutatorAdapter, FirestoreSelectorAdapter, I18n, Mutator, Selector } from "@lib";
import { Helmsman, messages } from "@view";

export function initApp(elementId) {


  const i18n = new I18n({ locale: navigator.language, messages });
  app.use(i18n);

  const connection = createConnectionFromEnv();
  const driver = new FirebaseDriver(connection);
  const auth = new FirebaseAuthAdapter(driver.auth);
  const selectorAdapter = new FirestoreSelectorAdapter(driver.firestore);
  const selector = new Selector(selectorAdapter);
  const mutatorAdapter = new FirestoreMutatorAdapter(driver.firestore);
  const mutator = new Mutator(mutatorAdapter);

  const gatekeeper = new Gatekeeper(auth);
  const artifacts = new Artifacts({ mutator, selector });
  const tags = new Tags({ mutator, selector });

  gatekeeper.artifacts = artifacts;
  gatekeeper.tags = tags;
  tags.gatekeeper = gatekeeper;
  artifacts.gatekeeper = gatekeeper;

  const helmsman = new Helmsman();
  app.use(helmsman);

  const dependencies = new Dependencies({
    artifacts,
    gatekeeper,
    helmsman,
    tags,
  });
  window.$dependencies = dependencies;
  app.use(dependencies);
}

function createConnectionFromEnv() {
  if (import.meta.env.VITE_SERVER_PLATFORM === "emulators") {
    console.info("using firebase emulators");
    if (
      typeof import.meta.env.VITE_PROJECT_ID !== "string"
      || typeof import.meta.env.VITE_API_KEY !== "string"
      || typeof import.meta.env.VITE_APP_ID !== "string"
    ) {
      throw new Error(
        "One or more of the environment variables for the emulators connection where not loaded properly",
      );
    }
  }
  else {
    if (
      typeof import.meta.env.VITE_PROJECT_ID !== "string"
      || typeof import.meta.env.VITE_API_KEY !== "string"
      || typeof import.meta.env.VITE_APP_ID !== "string"
      || typeof import.meta.env.VITE_AUTH_DOMAIN !== "string"
      || typeof import.meta.env.VITE_STORAGE_BUCKET !== "string"
      || typeof import.meta.env.VITE_MESSAGING_SENDER_ID !== "string"
      || typeof import.meta.env.VITE_MEASUREMENT_ID !== "string"
    ) {
      throw new Error(
        "One or more of the environment variables for the service connection where not loaded properly",
      );
    }
  }

  return {
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    projectId: import.meta.env.VITE_PROJECT_ID,
    serverPlatform: import.meta.env.VITE_SERVER_PLATFORM,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  };
}
