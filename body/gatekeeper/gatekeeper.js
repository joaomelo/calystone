export class Gatekeeper {
  artifacts;
  auth;
  tags;

  constructor(auth) {
    this.auth = auth;
  }

  close() {
    this.artifacts.close();
    this.tags.close();
  }

  open() {
    const artifactsPromise = this.artifacts.open();
    const tagsPromise = this.tags.open();
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

  solveUserId() {
    const user = this.auth.solveUser();
    return user.id;
  }
}
