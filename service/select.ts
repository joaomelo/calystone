import type {
  Firestore,
  Unsubscribe,
  CollectionReference,
} from "firebase/firestore";
import type { ItemId, Item, Predicate } from "@shared";
import type { CollectionName } from "./collections";

import { computed, reactive } from "vue";
import { onSnapshot, collection } from "firebase/firestore";

type Options = {
  firestore: Firestore;
  name: CollectionName;
};

export class Select {
  _query: CollectionReference;
  _unsubscribe: Unsubscribe = () => undefined;
  _items = reactive(new Map<ItemId, Item>());

  constructor({ firestore, name }: Options) {
    this._query = collection(firestore, name);
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
            { id: doc.id } as Item
          );
          this._items.set(doc.id, item);
        });
        resolve();
      });
    });
  }

  close() {
    this._items.clear();
    this._unsubscribe();
  }

  filter<T extends Item>(predicate?: Predicate) {
    const items = computed(() => {
      const list = Array.from(this._items.values());
      if (!predicate) return list;
      return list.filter(predicate) as T[];
    });
    return;
  }

  find(predicate: Predicate) {
    const maybeItem = computed(() => {
      const list = Array.from(this._items.values());
      return list.find(predicate);
    });
    return maybeItem;
  }
}
