import type { Firestore, Unsubscribe } from "firebase/firestore";

import { computed, reactive } from "vue";
import { v4 as uuid } from "uuid";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { asArray } from "@shared";

export type Options = {
  firestore: Firestore;
  name: Name;
};
export type Name = string;
export type Id = string;

export type IdOrIds = Id | Id[];

export type Checker<T> = (value: T) => boolean;

export class Dataset<Item, Payload> {
  _firestore: Firestore;
  _name: Name;
  _unsubscribe: Unsubscribe = () => undefined;
  _items = reactive(new Map<Id, Item>());

  constructor({ firestore, name }: Options) {
    this._firestore = firestore;
    this._name = name;
  }

  async open() {
    this._items.clear();

    return new Promise((resolve) => {
      const query = collection(this._firestore, this._name);
      this._unsubscribe = onSnapshot(query, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const item = Object.entries(doc.data()).reduce(
            (acc, [field, value]) => {
              // if is a firestore timestamp then convert to a js date object
              const parsedValue = value?.toDate ? value.toDate() : value;
              acc[field] = parsedValue;
              return acc;
            },
            {} as Record<string, unknown>
          );
          this._items.set(doc.id, item as Item);
        });
        resolve(true);
      });
    });
  }

  close() {
    this._items.clear();
    this._unsubscribe();
  }

  async add(payload: Payload) {
    const item = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    };

    const docRef = doc(this._firestore, this._name, item.id);
    await setDoc(docRef, item);
  }

  async edit(id: Id, payload: Partial<Payload>) {
    const payloadWithMetadata = {
      ...payload,
      updatedAt: new Date(),
    };

    const docRef = doc(this._firestore, this._name, id);
    await setDoc(docRef, payloadWithMetadata);
  }

  async del(payload: IdOrIds) {
    const ids = asArray<Id>(payload);

    const promises = ids.map((id) => {
      const docRef = doc(this._firestore, this._name, id);
      return deleteDoc(docRef);
    });

    await Promise.all(promises);

    return ids;
  }

  select(filter?: Checker<Item>) {
    const selection = computed(() => {
      const list = Array.from(this._items.values());
      if (!filter) return list;
      return list.filter(filter);
    });
    return selection;
  }

  selectOne(find: Checker<Item>) {
    const selection = computed(() => {
      const list = Array.from(this._items.values());
      return list.find(find);
    });
    return selection;
  }
}
