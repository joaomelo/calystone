import { computed, reactive } from "vue";
import { asArray } from "@lib";

export class Select {
  name;
  adapter;
  items = reactive(new Map());
  unsubscribe = () => undefined;
  isOpen = false;

  constructor(name, adapter) {
    this.name = name;
    this.adapter = adapter;
  }

  async open(whereOrWheres) {
    // if open is called without previously use of close, this will secure resource destruction
    this.close();
    this.isOpen = true;

    const wheres = asArray(whereOrWheres);
    return new Promise((resolve) => {
      this.unsubscribe = this.adapter.select({
        name: this.name,
        wheres,
        observer: (records) => {
          this.items.clear();
          records.forEach((record) => this.items.set(record.id, record));
          resolve();
        },
      });
    });
  }

  close() {
    this.isOpen = false;
    this.items.clear();
    this.unsubscribe();
  }

  get(id) {
    return this.items.get(id);
  }

  list(predicate) {
    const list = Array.from(this.items.values());
    if (!predicate) return list;
    return list.filter(predicate);
  }

  computed(getter = (list) => list) {
    return computed(() => getter(this.list()));
  }
}
