import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export class AuthDriver {
  _auth;

  constructor(app) {
    this._auth = getAuth(app);
  }

  subscribe(observer) {
    return onAuthStateChanged(this._auth, observer);
  }

  signUp(credentials) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  signIn(credentials) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signOut() {
    return signOut(this._auth);
  }
}
