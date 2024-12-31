type Value = boolean | null | number | string;
type Key = string;

export class Configuration {
  values: Map<Key, Value>;

  constructor(values: Record<Key, Value>) {
    this.values = new Map();
    Object.entries(values).forEach(([key, value]) => {
      let normalizedValue: Value = value;
      if (value === "true") normalizedValue = true;
      if (value === "false") normalizedValue = false;

      this.values.set(key, normalizedValue);
    });
  }

  get(key: Key, defaultValue: Value = null): Value {
    const value = this.values.get(key);
    return value ?? defaultValue;
  }

  is(key: Key, value: Value): boolean {
    return this.get(key, null) === value;
  }
}