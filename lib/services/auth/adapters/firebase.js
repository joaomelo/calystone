import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AUTH_STATUSES } from "../core";

export class FirebaseAuth {
  auth;
  status = null;

  constructor(auth) {
    this.auth = auth;
  }

  currentUser() {
    return {
      id: this.auth.currentUser.uid,
      email: this.auth.currentUser.email,
    };
  }

  async solveStatus() {
    if (this.status !== null) return this.status;

    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        this.status = user ? AUTH_STATUSES.SIGNED_IN : AUTH_STATUSES.SIGNED_OUT;
        resolve(this.status);
      });
    });
  }

  signUp({ email, password }) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }
}
