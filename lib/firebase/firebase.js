import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { install } from "./plugin";

export class Firebase {
  _app;
  _analytics;

  constructor(serviceConnection) {
    this._app = initializeApp(serviceConnection);
    this._analytics = getAnalytics(this._app);
  }

  get app() {
    return this._app;
  }

  install(app) {
    install({ firebase: this, app });
  }
}
