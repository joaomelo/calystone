import type { FirebaseOptions, FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export class Driver {
  readonly app: FirebaseApp;
  readonly firestore: Firestore;
  readonly analytics: Analytics;

  constructor(connection: FirebaseOptions) {
    this.app = initializeApp(connection);
    this.analytics = getAnalytics(this.app);
    this.firestore = getFirestore(this.app);
  }
}
