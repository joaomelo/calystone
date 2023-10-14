import type { WithIdOrIds, WithId } from "@shared";
import type { To } from "./to";

import { doc, deleteDoc } from "firebase/firestore";
import { asArray } from "@shared";

export async function del(idOrIds: WithIdOrIds, to: To) {
  const { name, driver } = to;
  const firestore = driver.getFirestore();

  const withIds = asArray<WithId>(idOrIds);
  const ids = withIds.map((withId) =>
    typeof withId === "string" ? withId : withId.id
  );

  const promises = ids.map((id) => {
    const docRef = doc(firestore, name, id);
    return deleteDoc(docRef);
  });

  await Promise.all(promises);
}
