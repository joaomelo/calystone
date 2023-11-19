import { AUTH_STATUSES } from "@lib";
import { key } from "./key";

export class Pilot {
  artifacts;
  auth;

  constructor({ artifacts, auth }) {
    this.artifacts = artifacts;
    this.auth = auth;
  }

  install(app) {
    app.provide(key, this);
  }

  async solve() {
    const status = await this.auth.open();
    if (status === AUTH_STATUSES.SIGNED_IN) {
      await this.artifacts.open(this.auth.userId);
    }
  }

  async signIn(payload) {
    await this.auth.signIn(payload);
    await this.artifacts.open(this.auth.userId);
  }

  async signOut() {
    await this.auth.signOut();
    this.artifacts.close();
  }

  async addArtifact(payload) {
    const usersIds = [this.auth.userId];
    await this.artifacts.add({ ...payload, usersIds });
  }
}
