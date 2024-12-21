import type { App } from "vue";

import type { ProviderKey, State } from "./state";

// store enable the use of reactive data in the application. they can be accessed globally using a composable. stores need to be extended by concrete classes in other to fine tune how state is created, provided and injected.
export abstract class Store<T> {
  providerKey: ProviderKey<T>;
  state: State<T>;

  constructor(providerKey: ProviderKey<T>, state: State<T>) {
    this.state = state;
    this.providerKey = providerKey;
  }

  install(app: App) {
    app.provide(this.providerKey, this.state);
  }
}
