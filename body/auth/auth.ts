import { Artifacts } from "../artifacts";

export class Auth {
  private artifacts: Artifacts;

  constructor(artifacts: Artifacts) {
    this.artifacts = artifacts;
  }

  async signIn() {
    await this.artifacts.open();
  }

  signOut() {
    this.artifacts.close();
  }
}
