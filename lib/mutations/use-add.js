import { v4 as uuid } from "uuid";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useFirebase } from "@lib/firebase";

export function useAdd(name) {
  const firebase = useFirebase();
  const db = getFirestore(firebase.app);

  const add = (payload) => {
    const item = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    };

    const docRef = doc(db, name, item.id);
    return setDoc(docRef, item);
  };

  return add;
}
