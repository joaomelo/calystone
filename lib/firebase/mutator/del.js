import { doc, deleteDoc } from "firebase/firestore";
import { extractIds } from "@lib";

export async function del({ idOrIds, name, driver }) {
  const firestore = driver.firestore;

  const ids = extractIds(idOrIds);
  const promises = ids.map((id) => {
    const docRef = doc(firestore, name, id);
    return deleteDoc(docRef);
  });

  await Promise.all(promises);
}
