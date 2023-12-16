import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export class FirebaseDriver {
  analytics;
  app;

  constructor(connection) {
    this.app = initializeApp(connection);
    this.analytics = getAnalytics(this.app);
  }
}
