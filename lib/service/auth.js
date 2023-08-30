import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export class Auth {
  _firebaseAuth;
  user = ref(null);

  constructor(firebaseApp) {
    this._firebaseAuth = getAuth(firebaseApp);
    onAuthStateChanged(this._firebaseAuth, (userData) => {
      if (userData) {
        this.user.id = userData.uid;
        this.user.value = userData.email;
      } else {
        this.user.value = null;
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
