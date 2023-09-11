import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { asArray } from "../utils";

export class Dataset {
  set(payload) {
    const docRef = doc(this._db, this._name, payload.id);
    const payloadWithMetadata = {
      ...payload,
      updatedAt: new Date(),
    };
    return setDoc(docRef, payloadWithMetadata, { merge: true });
  }
}
