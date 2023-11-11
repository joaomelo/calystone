import type { Payload } from "@lib";
import type { To } from "./to";

import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";

export async function add(payload: Payload, to: To) {
  const { name, driver } = to;
  const firestore = driver.firestore;

  const id = uuid();
  const item = {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...payload,
  };

  const docRef = doc(firestore, name, id);
  await setDoc(docRef, item);
}
