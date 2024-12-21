type StorageKey = string;
type As<T> = (data: unknown) => T;

export class LocalStorage<T> {
  as: As<T>;
  storageKey: StorageKey;

  constructor(storageKey: StorageKey, as: As<T>) {
    this.storageKey = storageKey;
    this.as = as;
  }

  load(): T {
    const storedData = localStorage.getItem(this.storageKey);
    if (!storedData) return this.as(undefined);
    try {
      const parsedData = JSON.parse(storedData) as unknown;
      return this.as(parsedData);
    } catch {
      return this.as(undefined);
    }
  }

  save(data: T) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
