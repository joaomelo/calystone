import type { Unsubscribe, CollectionReference } from "firebase/firestore";
import type { ItemId, ItemFields, Predicate, CollectionName } from "@lib";
import type { Driver } from "../driver";

import { computed, reactive } from "vue";
import { onSnapshot, collection } from "firebase/firestore";

export class Select<T extends ItemFields> {
  _query: CollectionReference;
  _unsubscribe: Unsubscribe = () => undefined;
  _items = reactive(new Map<ItemId, T>());

  constructor(name: CollectionName, driver: Driver) {
    this._query = collection(driver.firestore, name);
  }

  async open() {
    this._items.clear();

    return new Promise<void>((resolve) => {
      this._unsubscribe = onSnapshot(this._query, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const item = Object.entries(doc.data()).reduce(
            (acc, [field, value]) => {
              // if is a firestore timestamp then convert to a js date object
              const parsedValue = value?.toDate ? value.toDate() : value;
              acc[field] = parsedValue;
              return acc;
            },
            { id: doc.id } as Record<string, unknown>
          );
          this._items.set(doc.id, item as T);
        });
        resolve();
      });
    });
  }

  close() {
    this._items.clear();
    this._unsubscribe();
  }

  filter(predicate?: Predicate) {
    const items = computed(() => {
      const list = Array.from(this._items.values());
      if (!predicate) return list;
      return list.filter(predicate);
    });
    return items;
  }

  find(predicate: Predicate) {
    const maybeItem = computed(() => {
      const list = Array.from(this._items.values());
      return list.find(predicate);
    });
    return maybeItem;
  }
}
