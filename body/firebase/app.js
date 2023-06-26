import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Auth } from "./auth";
import { Collection } from "./collection";
export class Firebase {
  _app;
  _analytics;
  _db;

  auth;

  constructor({ config, collections }) {
    this._app = initializeApp(config);
    this._analytics = getAnalytics(this._app);
    this._db = new getFirestore(this._app);

    this.auth = new Auth(this._app);
    collections.forEach(
      (collection) =>
        (this[collection] = new Collection({
          name: collection,
          db: this._db,
          auth: this.auth,
        }))
    );
  }
}
