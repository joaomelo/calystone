import type { IdableOrIdables, Idable } from "@shared";
import type { To } from "./to";

import { doc, deleteDoc } from "firebase/firestore";
import { asArray } from "@shared";

export async function del(idOrIds: IdableOrIdables, to: To) {
  const { name, driver } = to;
  const firestore = driver.getFirestore();

  const Idables = asArray<Idable>(idOrIds);
  const ids = Idables.map((Idable) =>
    typeof Idable === "string" ? Idable : Idable.id
  );

  const promises = ids.map((id) => {
    const docRef = doc(firestore, name, id);
    return deleteDoc(docRef);
  });

  await Promise.all(promises);
}
