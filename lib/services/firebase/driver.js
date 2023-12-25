import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export class FirebaseDriver {
  app;
  analytics;
  auth;
  firestore;

  constructor(connection) {
    this.app = initializeApp(connection);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);

    if (connection.serverPlatform === "emulators") {
      connectAuthEmulator(this.auth, "http://127.0.0.1:9099");
      connectFirestoreEmulator(this.firestore, "127.0.0.1", 8080);
    } else {
      this.analytics = getAnalytics(this.app);
    }
  }
}
