import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useFirebase } from "@lib/firebase";
import { asArray } from "@lib/arrays";

export function useDel(name) {
  const firebase = useFirebase();
  const db = getFirestore(firebase.app);

  const del = (itemOrItems) => {
    const itemsOrIds = asArray(itemOrItems);

    const promises = itemsOrIds.map((itemOrId) => {
      const id = itemOrId?.id || itemOrId;
      const docRef = doc(db, name, id);
      return deleteDoc(docRef);
    });

    return Promise.all(promises);
  };

  return del;
}
