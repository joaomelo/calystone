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

    return new Promise((resolve) => {
      this.unsubscribe = onSnapshot(query, (snapshot) => {
        this.items.clear();
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

  findById(id) {
    return this.items.get(id);
  }

  computed() {
    const items = computed(() => this.list());
    return items;
  }
}
