import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { install } from "./plugin";

export class Firebase {
  _app;
  _analytics;
  // cache for selects
  _selects = {};

  constructor(serviceConnection) {
    this._app = initializeApp(serviceConnection);
    this._analytics = getAnalytics(this._app);
  }

  get app() {
    return this._app;
  }

  get selects() {
    return this._selects;
  }

  install(app) {
    install({ firebase: this, app });
  }
}
