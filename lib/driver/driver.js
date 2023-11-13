import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export class Driver {
  analytics;
  app;
  firestore;
  auth;

  constructor(connection) {
    this.app = initializeApp(connection);
    this.analytics = getAnalytics(this.app);
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}
