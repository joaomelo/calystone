import type { IdeableOrIdeables, Ideable } from "@lib";
import type { To } from "./to";

import { doc, deleteDoc } from "firebase/firestore";
import { asArray } from "@lib";

export async function del(idOrIds: IdeableOrIdeables, to: To) {
  const { name, driver } = to;
  const firestore = driver.firestore;

  const Ideables = asArray<Ideable>(idOrIds);
  const ids = Ideables.map((Ideable) =>
    typeof Ideable === "string" ? Ideable : Ideable.id
  );

  const promises = ids.map((id) => {
    const docRef = doc(firestore, name, id);
    return deleteDoc(docRef);
  });

  await Promise.all(promises);
}
