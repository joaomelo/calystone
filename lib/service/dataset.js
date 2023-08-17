import { BehaviorSubject } from "rxjs";
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
  _subject = new BehaviorSubject(null);
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

  get firstLoad() {
    return this._firstLoadPromise;
  }

  load(user) {
    this._unsubscribe();

    if (!user) {
      this._firstLoadPromise = new Promise(
        (resolve) => (this._firstLoadResolve = resolve)
      );
      this._unsubscribe = () => null;
      this._subject.next(null);
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
      const items = snapshot.docs.map((doc) => createItem(doc));
      this._subject.next(items);

      if (this._firstLoadResolve) {
        this._firstLoadResolve();
        this._firstLoadResolve = null;
      }
    });
  }

  subscribe(observer) {
    const subscription = this._subject.subscribe(observer);
    return () => subscription.unsubscribe();
  }

  list() {
    return this._subject.value;
  }

  find(fn) {
    return this.list().find(fn);
  }

  findWithId(id) {
    return this.list().find((item) => item.id === id);
  }

  filter(fn) {
    return this.list().filter(fn);
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
