import type { ItemId, Payload } from "@shared";
import type { To } from "./to";

import { doc, setDoc } from "firebase/firestore";

export async function put(id: ItemId, payload: Payload, to: To) {
  const { name, driver } = to;
  const firestore = driver.getFirestore();

  const payloadWithMetadata = {
    ...payload,
    updatedAt: new Date(),
  };

  const docRef = doc(firestore, name, id);
  await setDoc(docRef, payloadWithMetadata, { merge: true });
}
