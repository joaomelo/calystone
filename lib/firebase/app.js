import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Auth } from "./auth";
import { Collection } from "./collection";

export class Firebase {
  _app;
  _analytics;
  _db;
  _collections = new Map();

  auth;

  constructor(config) {
    this._app = initializeApp(config);
    this._analytics = getAnalytics(this._app);
    this._db = new getFirestore(this._app);

    this.auth = new Auth(this._app);
  }

  collection(name, where) {
    const collection = new Collection({
      name,
      where,
      db: this._db,
      auth: this.auth,
    });
    this._collections.set(name, collection);
    return collection;
  }
}
