import { User } from "./user";

export class Users {
  _auth;
  _usersDataset;

  _currentUserId;
  _users = [];

  constructor(service) {
    this._auth = service.auth;
    this._usersDataset = service.data.users;

    service.select(["auth", "users"], ([authData, usersData]) => {
      this._currentUserId = authData?.uid;

      if (!usersData) {
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

  get userId() {
    return this._currentUserId;
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
}
