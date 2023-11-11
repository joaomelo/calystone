export class Pilot {
  display;
  // artifacts;
  // auth;

  constructor({ artifacts, auth, display }) {
    this.artifacts = artifacts;
    this.auth = auth;
    this.display = display;
    this.display.toSignOut();
  }

  // async singIn() {
  //   await this.auth.signIn();
  //   await this.artifacts.open();
  //   if (this.display.isEntryInternal()) {
  //     this.display.toEntry();
  //   } else {
  //     this.display.toPlan();
  //   }
  // }
  // async signOut() {
  //   await this.auth.signOut();
  //   this.artifacts.close();
  //   this.display.toSignOut();
  // }
  // async addArtifact(name: string) {
  //   await this.artifacts.add({ name });
  // }
  // listArtifacts() {
  //   return this.artifacts.filter();
  // }
}
