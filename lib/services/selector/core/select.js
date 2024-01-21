import { reactive } from "vue";

export class Select {
  isOpen = false;
  items = reactive(new Map());
  query;
  unsubscribe = () => undefined;

  constructor({ adapter, query }) {
    this.adapter = adapter;
    this.query = query;
  }

  close() {
    this.isOpen = false;
    this.items.clear();
    this.unsubscribe();
  }

  get(id) {
    return this.items.get(id);
  }

  list() {
    return Array.from(this.items.values());
  }

  open() {
    // if open is called without previously use of close, this will secure resource destruction
    this.close();

    return new Promise((resolve) => {
      const observer = (records) => {
        this.update(records);
        resolve();
      };
      this.unsubscribe = this.adapter.subscribe(this.query, observer);
    });
  }

  update(records) {
    this.items.clear();
    records.forEach(record => this.items.set(record.id, record));
  }
}
