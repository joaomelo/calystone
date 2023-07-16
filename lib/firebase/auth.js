import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export class Auth {
  _firebaseAuth;

  constructor(firebaseApp) {
    this._firebaseAuth = getAuth(firebaseApp);
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
