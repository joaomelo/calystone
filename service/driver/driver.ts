import type { App, InjectionKey } from "vue";
import type { FirebaseOptions, FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export const key: InjectionKey<Driver> = Symbol("driver");

type Options = {
  connection: FirebaseOptions;
};

export class Driver {
  _app: FirebaseApp;
  _firestore: Firestore;
  _analytics: Analytics;

  constructor({ connection }: Options) {
    this._app = initializeApp(connection);
    this._analytics = getAnalytics(this._app);
    this._firestore = getFirestore(this._app);
  }

  getFirestore() {
    return this._firestore;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
