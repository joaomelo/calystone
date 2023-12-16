import { reactive } from "vue";
import { closeSelect } from "./close";

export async function openSelect(selector, query) {
  // if open is called without previously use of close, this will secure resource destruction
  closeSelect(selector, query.name);

  const select = {
    items: reactive(new Map()),
    query,
    isOpen: true,
    unsubscribe: () => undefined,
  };

  return new Promise((resolve) => {
    select.unsubscribe = selector.open(select, (records) => {
      select.items.clear();
      records.forEach((record) => select.items.set(record.id, record));
      resolve();
    });
  });
}
