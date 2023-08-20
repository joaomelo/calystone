import { Stateful } from "../../lib";
import { User } from "./user";
import { validateEmail, validatePassword } from "./validation";
import { AUTH_STATUSES } from "./statuses";

export class Users extends Stateful {
  _auth;
  _usersDataset;

  _currentUserId;
  _authStatus = AUTH_STATUSES.UNSOLVED;
  _users = [];

  constructor(service) {
    super();
    this._auth = service.auth;
    this._usersDataset = service.data.users;

    service.select(["auth", "users"], ([authData, usersData]) => {
      this._authStatus = authData
        ? AUTH_STATUSES.SIGNED_IN
        : AUTH_STATUSES.SIGNED_OUT;
      this._currentUserId = authData?.uid;

      if (!this._usersDataset.loadedOnce) {
        this._users = [];
        this.notify();
        return;
      }

      this._users = usersData.map(({ id: userId }) =>
        User.mount({ userId, usersData })
      );
      this.user({ id: authData?.uid, email: authData?.email });
      this.notify();
    });
  }

  get authStatus() {
    return this._authStatus;
  }

  get userId() {
    return this._currentUserId;
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

  user({ id, email }) {
    const user = this._usersDataset.findWithId(id);
    if (user) return;
    return this._usersDataset.add({ id, email });
  }
}
