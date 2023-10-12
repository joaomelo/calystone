import type { App, InjectionKey } from "vue";
import type { FirebaseOptions, FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";
import type { Name } from "./dataset";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Dataset } from "./dataset";

export const key: InjectionKey<Service> = Symbol("service");

export class Service {
  _app: FirebaseApp;
  _firestore: Firestore;
  _analytics: Analytics;

  constructor({ connection }: Options) {
    this._app = initializeApp(connection);
    this._analytics = getAnalytics(this._app);
    this._firestore = getFirestore(this._app);
  }

  dataset<Item, Payload>(name: Name) {
    const dataset = new Dataset<Item, Payload>({
      name,
      firestore: this._firestore,
    });
    return dataset;
  }

  install(app: App) {
    app.provide(key, this);
  }
}

type Options = {
  connection: FirebaseOptions;
};
