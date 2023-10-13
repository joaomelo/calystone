import type { WithIdOrIds, WithId } from "@shared";
import type { CollectionName } from "./collections";

import { doc, deleteDoc } from "firebase/firestore";
import { asArray } from "@shared";
import { useService } from "./use-service";

export function useDel(name: CollectionName) {
  const service = useService();

  const del = async (idOrIds: WithIdOrIds) => {
    const withIds = asArray<WithId>(idOrIds);
    const ids = withIds.map((withId) =>
      typeof withId === "string" ? withId : withId.id
    );

    const promises = ids.map((id) => {
      const docRef = doc(service.getFirestore(), name, id);
      return deleteDoc(docRef);
    });

    await Promise.all(promises);

    return ids;
  };

  return del;
}
