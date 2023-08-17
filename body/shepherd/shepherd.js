import { validateEmail, validatePassword } from "./validation";

export class Shepherd {
  _auth;
  _usersDataset;

  constructor({ service }) {
    this._auth = service.auth;
    this._usersDataset = service.data["users"];
  }

  listUsers() {
    return this._users;
  }

  findUserWithId(id) {
    return this._users.find((user) => user.id === id);
  }

  findUserWithEmail(email) {
    return this._users.find((user) => user.email === email);
  }

  async signUp(credentials) {
    const { email, password } = credentials;
    validateEmail(email);
    validatePassword(password);
    const { user } = await this._auth.signUp(credentials);
    return this.enroll({ id: user.uid, email });
  }

  async signIn(credentials) {
    const { email } = credentials;
    validateEmail(email);
    const { user } = await this._auth.signIn(credentials);
    return this._shepherd.enroll({ id: user.uid, email });
  }

  async enroll({ id, email }) {
    await this._usersDataset.firstLoad;

    const user = this._usersDataset.findWithId(id);
    if (user) return;

    return this._usersDataset.add({ id, email });
  }

  signOut() {
    return this._auth.signOut();
  }
}
