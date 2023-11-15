import { computed, reactive } from "vue";
import { onSnapshot, collection } from "firebase/firestore";
import { parseDoc } from "./item";

export class Select {
  query;
  unsubscribe = () => undefined;
  items = reactive(new Map());

  constructor(name, driver) {
    this.query = collection(driver.firestore, name);
  }

  async open() {
    this.items.clear();
    return new Promise((resolve) => {
      this.unsubscribe = onSnapshot(this.query, (snapshot) => {
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

  list() {
    return this.filter();
  }

  filter(predicate) {
    const items = computed(() => {
      const list = Array.from(this.items.values());
      if (!predicate) return list;
      return list.filter(predicate);
    });
    return items;
  }

  find(predicate) {
    const maybeItem = computed(() => {
      const list = Array.from(this.items.values());
      return list.find(predicate);
    });
    return maybeItem;
  }
}
