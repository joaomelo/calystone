import { computed, reactive } from "vue";
import { onSnapshot, collection } from "firebase/firestore";
import { parseDoc } from "./item";
import { createQuery } from "./query";

export class Select {
  collection;
  unsubscribe = () => undefined;
  items = reactive(new Map());

  constructor(name, driver) {
    this.collection = collection(driver.firestore, name);
  }

  async open(filters) {
    const query = createQuery(this.collection, filters);

    this.items.clear();
    return new Promise((resolve) => {
      this.unsubscribe = onSnapshot(query, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const item = parseDoc(doc);
          this.items.set(doc.id, item);
        });
        resolve();
      });
    });
  }

  close() {
    this.items.clear();
    this.unsubscribe();
  }

  list(predicate) {
    const list = Array.from(this.items.values());
    if (!predicate) return list;
    return list.filter(predicate);
  }

  computed(getter, predicate) {
    const items = computed(() => getter(this.list(predicate)));
    return items;
  }
}
