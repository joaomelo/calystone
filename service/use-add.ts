import type { Payload } from "@shared";
import type { CollectionName } from "./collections";

import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useService } from "./use-service";

export function useAdd(name: CollectionName) {
  const service = useService();

  const add = async (payload: Payload) => {
    const id = uuid();
    const Item = {
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    };

    const docRef = doc(service.getFirestore(), name, id);
    await setDoc(docRef, Item);
  };

  return add;
}
