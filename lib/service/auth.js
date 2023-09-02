import { reactive } from "vue";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AUTH_STATUSES } from "./auth-statuses";

export class Auth {
  _firebaseAuth;
  user = reactive({
    id: null,
    email: null,
    status: AUTH_STATUSES.UNSOLVED,
  });

  constructor(firebaseApp) {
    this._firebaseAuth = getAuth(firebaseApp);
    onAuthStateChanged(this._firebaseAuth, (userData) => {
      if (userData) {
        this.user.id = userData.uid;
        this.user.email = userData.email;
        this.user.status = AUTH_STATUSES.SIGNED_IN;
      } else {
        this.user.id = null;
        this.user.email = null;
        this.user.status = AUTH_STATUSES.SIGNED_OUT;
      }
    });
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
