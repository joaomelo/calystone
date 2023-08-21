import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { Auth } from "./auth";
import { Dataset } from "./dataset";
import { select } from "./select";

export class Service {
  _app;
  _analytics;
  _db;
  _auth;
  _datasets = {};

  constructor(serviceConnection) {
    this._app = initializeApp(serviceConnection);
    this._analytics = getAnalytics(this._app);
    this._db = new getFirestore(this._app);
    this._auth = new Auth(this._app);
  }

  get auth() {
    return this._auth;
  }

  get data() {
    return this._datasets;
  }

  load({ name, where }) {
    this._datasets[name] = new Dataset({
      name,
      where,
      db: this._db,
      auth: this._auth,
    });
  }

  select(names, observer) {
    const selectables = names.map((name) =>
      name === "auth" ? this.auth : this._datasets[name]
    );
    return select(selectables, observer);
  }
}
