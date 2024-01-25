import { Helmsman } from "./helmsman";

export class Display {
  helmsman = new Helmsman();

  install(app) {
    app.use(this.helmsman.router);
  }

  mounted() {
    return this.helmsman.solve();
  }

  signedIn() {
    return this.helmsman.start();
  }

  signedOut() {
    return this.helmsman.signIn();
  }
}
