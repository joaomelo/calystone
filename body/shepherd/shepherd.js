import { Stateful } from "../../lib";
import { User } from "../user";
import { validateEmail, validatePassword } from "./validation";
import { AUTH_STATUSES } from "./statuses";

export class Shepherd extends Stateful {
  _auth;
  _usersDataset;

  _user;
  _authStatus = AUTH_STATUSES.UNSOLVED;
  _users = [];

  constructor({ service }) {
    super();
    this._auth = service.auth;
    this._usersDataset = service.data["users"];

    service.select(["auth", "users"], ([authData, usersData]) => {
      this._authStatus = authData
        ? AUTH_STATUSES.SIGNED_IN
        : AUTH_STATUSES.SIGNED_OUT;
      this._user = authData;

      if (service.loadedOnce) {
        this._users = usersData.map(({ id }) => User.service({ id, service }));
        this.enroll({ id: this._user.uid, email: this._user.email });
      } else {
        this._users = [];
      }

      this.notify();
    });
  }

  get authStatus() {
    return this._authStatus;
  }

  get userId() {
    return this._user?.uid;
  }

  isUnsolved() {
    return this._authStatus === AUTH_STATUSES.UNSOLVED;
  }

  isSignedIn() {
    return this._authStatus === AUTH_STATUSES.SIGNED_IN;
  }

  isSignedOut() {
    return this._authStatus === AUTH_STATUSES.SIGNED_OUT;
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

  enroll({ id, email }) {
    const user = this._usersDataset.findWithId(id);
    if (user) return;
    return this._usersDataset.add({ id, email });
  }

  signUp(credentials) {
    const { email, password } = credentials;
    validateEmail(email);
    validatePassword(password);
    return this._auth.signUp(credentials);
  }

  signIn(credentials) {
    const { email } = credentials;
    validateEmail(email);
    return this._auth.signIn(credentials);
  }

  signOut() {
    return this._auth.signOut();
  }
}
