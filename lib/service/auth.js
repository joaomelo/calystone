import { BehaviorSubject } from "rxjs";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export class Auth {
  _subject = new BehaviorSubject(null);
  _firebaseAuth;

  constructor(firebaseApp) {
    this._firebaseAuth = getAuth(firebaseApp);
    onAuthStateChanged(this._firebaseAuth, (data) => this._subject.next(data));
  }

  get userId() {
    return this._firebaseAuth.currentUser?.uid;
  }

  subscribe(observer) {
    const subscription = this._subject.subscribe(observer);
    return () => subscription.unsubscribe();
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
