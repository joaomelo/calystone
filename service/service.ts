import type { App, InjectionKey } from "vue";
import type { FirebaseOptions, FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";
import type { CollectionName } from "./collections";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Select } from "./select";
import { COLLECTIONS_NAMES } from "./collections";

export const key: InjectionKey<Service> = Symbol("service");

type Options = {
  connection: FirebaseOptions;
};

export class Service {
  _app: FirebaseApp;
  _firestore: Firestore;
  _analytics: Analytics;
  _selects = new Map<CollectionName, Select>();

  constructor({ connection }: Options) {
    this._app = initializeApp(connection);
    this._analytics = getAnalytics(this._app);
    this._firestore = getFirestore(this._app);

    COLLECTIONS_NAMES.forEach((name) => {
      const dataset = new Select({ name, firestore: this._firestore });
      this._selects.set(name, dataset);
    });
  }

  getFirestore() {
    return this._firestore;
  }

  getSelect(name: CollectionName) {
    const select = this._selects.get(name);
    if (!select)
      throw new Error("dataset was not created during service initialization");
    return select;
  }

  open() {
    const promises: Promise<void>[] = [];
    this._selects.forEach((dataset) => promises.push(dataset.open()));
    return promises;
  }

  close() {
    this._selects.forEach((dataset) => dataset.close());
  }

  install(app: App) {
    app.provide(key, this);
  }
}
