import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export class Firebase {
  _app;
  _analytics;
  _db;

  auth;

  constructor(config) {
    this._app = initializeApp(config);
    this._analytics = getAnalytics(this._app);
    this._db = new getFirestore(this._app);
  }

  get app() {
    return this._app;
  }

  get db() {
    return this._db;
  }
}
