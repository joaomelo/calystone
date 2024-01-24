export class Gatekeeper {
  auth;

  constructor({ auth }) {
    this.auth = auth;
  }

  solveStatus() {
    return this.auth.solveStatus();
  }
}
