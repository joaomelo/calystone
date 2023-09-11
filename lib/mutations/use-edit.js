import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useFirebase } from "@lib/firebase";

export function useEdit(name, options = { merge: true }) {
  const firebase = useFirebase();
  const db = getFirestore(firebase.app);

  const edit = (payload) => {
    const payloadWithMetadata = {
      ...payload,
      updatedAt: new Date(),
    };

    const docRef = doc(db, name, payload.id);
    return setDoc(docRef, payloadWithMetadata, options);
  };

  return edit;
}
