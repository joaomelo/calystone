import { computed, reactive } from "vue";
import { onSnapshot, collection } from "firebase/firestore";
import { parseDoc } from "./item";
import { createQuery } from "./query";

export class Select {
  collection;
  unsubscribe = () => undefined;
  items = reactive(new Map());
  isOpen = false;

  constructor(name, driver) {
    this.collection = collection(driver.firestore, name);
  }

  async open(filters) {
    // if open is called without previously use of close, this will secure resource destruction
    this.close();
    this.isOpen = true;

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
    this.isOpen = false;
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
