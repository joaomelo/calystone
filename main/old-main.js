import { Artifacts, Gatekeeper, Tags } from "@body";
import { Dependencies, FirebaseAuthAdapter, FirebaseDriver, FirestoreMutatorAdapter, FirestoreSelectorAdapter, I18n, Mutator, Selector } from "@lib";
import { messages } from "@view";

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

  const dependencies = new Dependencies({
    artifacts,
    gatekeeper,
    helmsman,
    tags,
  });
  window.$dependencies = dependencies;
  app.use(dependencies);
}