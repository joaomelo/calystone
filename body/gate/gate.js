import { AUTH_STATUSES } from "@lib";

export class Gate {
  artifacts;
  auth;

  constructor({ artifacts, auth }) {
    this.artifacts = artifacts;
    this.auth = auth;
  }

  get userId() {
    return this.auth.userId;
  }

  get userEmail() {
    return this.auth.user.email;
  }

  get status() {
    return this.auth.status;
  }

  async solve() {
    const status = await this.auth.open();
    if (status === AUTH_STATUSES.SIGNED_IN && !this.artifacts.isOpen) {
      await this.artifacts.open(this.userId);
    }
  }

  async signIn(payload) {
    await this.auth.signIn(payload);
    await this.artifacts.open(this.userId);
  }

  async signOut() {
    this.artifacts.close();
    await this.auth.signOut();
  }
}
