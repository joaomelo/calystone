import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export class Auth {
  _firebaseAuth;

  constructor(app) {
    this._firebaseAuth = getAuth(app);
  }

  get userId() {
    return this._firebaseAuth.currentUser.uid;
  }

  subscribe(observer) {
    return onAuthStateChanged(this._firebaseAuth, observer);
  }

  signUp(credentials) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(this._firebaseAuth, email, password);
  }

  signIn(credentials) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this._firebaseAuth, email, password);
  }

  signOut() {
    return signOut(this._firebaseAuth);
  }
}
