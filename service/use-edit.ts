import type { ItemId, Payload } from "@shared";
import type { CollectionName } from "./collections";

import { doc, setDoc } from "firebase/firestore";
import { useService } from "./use-service";

export function useEdit(name: CollectionName) {
  const service = useService();

  const edit = async (id: ItemId, payload: Payload) => {
    const payloadWithMetadata = {
      ...payload,
      updatedAt: new Date(),
    };

    const docRef = doc(service.getFirestore(), name, id);
    await setDoc(docRef, payloadWithMetadata);
  };

  return edit;
}
