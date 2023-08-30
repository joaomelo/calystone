import { ref, reactive } from "vue";
import { v4 as uuid } from "uuid";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export class Dataset {
  items = reactive(new Map()); // the map data structure will be useful when later the data querying logic need to be dealt with events at the document level
  loaded = ref(false);

  _unsubscribe = () => null;
  _name;
  _auth;
  _db;

  constructor({ db, auth, name, where }) {
    this._name = name;
    this._where = where;
    this._db = db;
    this._auth = auth;
    this._auth.subscribe((user) => this.load(user));
  }

  load(user) {
    this._unsubscribe();

    if (!user) {
      this.items.clear();
      this.loaded.value = false;
      this._unsubscribe = () => null;
      return;
    }

    let queryRef = collection(this._db, this._name);
    if (this._where) {
      const whereConfig = this._where(user);
      queryRef = query(
        queryRef,
        where(whereConfig.field, whereConfig.op, whereConfig.value)
      );
    }

    this._unsubscribe = onSnapshot(queryRef, (snapshot) => {
      this.items.clear();
      snapshot.docs.forEach((doc) => {
        const item = createItem(doc);
        this.items.set(item.id, item);
      });
      this.loaded.value = true;
    });
  }

  list() {
    return this.items.values();
  }

  find(fn) {
    let item = undefined;
    this.items.forEach((value) => {
      if (fn(value)) item = value;
    });
    return item;
  }

  findWithId(id) {
    return this.items.get(id);
  }

  filter(fn) {
    let items = [];
    this.items.forEach((value) => {
      if (fn(value)) items.push(value);
    });
    return items;
  }

  add(payload) {
    const item = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    };
    const docRef = doc(this._db, this._name, item.id);
    return setDoc(docRef, item);
  }

  set(payload) {
    const docRef = doc(this._db, this._name, payload.id);
    const payloadWithMetadata = {
      ...payload,
      updatedAt: new Date(),
    };
    return setDoc(docRef, payloadWithMetadata, { merge: true });
  }

  del(maybeItem) {
    const id = typeof maybeItem === "object" ? maybeItem.id : maybeItem;
    const docRef = doc(this._db, this._name, id);
    return deleteDoc(docRef);
  }
}

function createItem(doc) {
  const item = Object.entries(doc.data()).reduce((acc, [field, value]) => {
    // if is a firestore timestamp then convert to a js date object
    const parsedValue = value?.toDate ? value.toDate() : value;
    acc[field] = parsedValue;
    return acc;
  }, {});
  item.id = doc.id;
  return item;
}
