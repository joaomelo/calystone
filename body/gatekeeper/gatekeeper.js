export class Gatekeeper {
  artifacts;
  auth;
  tags;

  constructor({ artifacts, auth, tags }) {
    this.auth = auth;
    this.artifacts = artifacts;
    this.tags = tags;
  }

  close() {
    this.artifacts.close();
    this.tags.close();
  }

  open() {
    const { id: userId } = this.auth.solveUser();
    const artifactsPromise = this.artifacts.open(userId);
    const tagsPromise = this.tags.open(userId);
    return Promise.all([artifactsPromise, tagsPromise]);
  }

  signIn(payload) {
    return this.auth.signIn(payload);
  }

  signOut() {
    this.close();
    return this.auth.signOut();
  }

  signUp(payload) {
    return this.auth.signUp(payload);
  }

  solveStatus() {
    return this.auth.solveStatus();
  }
}
