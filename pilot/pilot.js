import { AUTH_STATUSES } from "@lib";
import { key } from "./key";

export class Pilot {
  router;
  artifacts;
  auth;

  constructor({ artifacts, auth, router }) {
    this.artifacts = artifacts;
    this.auth = auth;
    this.router = router;
    this.router.push({ name: "page-unsolved" });
  }

  async start() {
    const status = await this.auth.solve();
    const name = status === AUTH_STATUSES.SIGNED_IN ? "page-plan" : "page-auth";
    this.router.push({ name });
  }

  // async singIn() {
  //   await this.auth.signIn();
  //   await this.artifacts.open();
  //   if (this.router.isEntryInternal()) {
  //     this.router.toEntry();
  //   } else {
  //     this.router.toPlan();
  //   }
  // }
  // async signOut() {
  //   await this.auth.signOut();
  //   this.artifacts.close();
  //   this.router.toSignOut();
  // }
  // async addArtifact(name: string) {
  //   await this.artifacts.add({ name });
  // }
  // listArtifacts() {
  //   return this.artifacts.filter();
  // }

  install(app) {
    app.provide(key, this);
  }
}
