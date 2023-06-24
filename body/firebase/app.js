import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AuthDriver } from "./auth";

export class FirebaseDriver {
  _app;
  _analytics;

  auth;

  constructor(config) {
    this._app = initializeApp(config);
    this._analytics = getAnalytics(this._app);
    this.auth = new AuthDriver(this._app);
  }
}
