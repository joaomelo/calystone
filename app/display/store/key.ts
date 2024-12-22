import type { InjectionKey } from "vue";

import type { Store } from "./store";

export const key: InjectionKey<Store> = Symbol("store");
