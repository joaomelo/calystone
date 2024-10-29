import { Artifacts } from "@/domain/artifacts";
import { type App, inject, type InjectionKey, reactive } from "vue";

const key: InjectionKey<Store> = Symbol("store");

export class Store {
  public readonly artifacts = reactive(new Artifacts());

  static use() {
    const maybeStore = inject(key);
    if (!maybeStore) {
      throw new Error("store was not provided during initialization");
    }
    return maybeStore;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
