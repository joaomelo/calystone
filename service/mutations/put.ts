import type { PayloadWithId } from "@lib";
import type { To } from "./to";

import { doc, setDoc } from "firebase/firestore";

export async function put(payload: PayloadWithId, to: To) {
  const { name, driver } = to;
  const firestore = driver.firestore;

  const payloadWithMetadata = {
    ...payload,
    updatedAt: new Date(),
  };

  const docRef = doc(firestore, name, payload.id);
  await setDoc(docRef, payloadWithMetadata, { merge: true });
}
