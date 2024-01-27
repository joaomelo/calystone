export class Gatekeeper {
  auth;

  constructor({ auth }) {
    this.auth = auth;
  }

  signIn(payload) {
    return this.auth.signIn(payload);
  }

  signOut() {
    // closeArtifacts(dependencies);
    // closeTags(dependencies);

    return this.auth.signOut();
  }

  signUp(payload) {
    return this.auth.signUp(payload);
  }

  solveStatus() {
    return this.auth.solveStatus();
  }
}
