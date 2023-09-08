import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { Auth } from "./auth";
import { Dataset } from "./dataset";
import { install } from "./plugin";

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

  get datasets() {
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

  select(nameOrNames) {
    const reactiveData = (name) =>
      name === "auth" ? this.auth : this.datasets[name];

    if (typeof nameOrNames === "string") return reactiveData(nameOrNames);
    return nameOrNames.map((name) => reactiveData(name));
  }

  loaded() {
    console.log("loaded");
    return new Promise((resolve) => {
      console.log("retornei");
      setTimeout(() => {
        console.log("lá vai");
        resolve();
      }, 5000);
    });
  }

  install(app) {
    install({ service: this, app });
  }
}
