import type { InjectionKey } from "vue";

import type { State } from "./state";

export const key: InjectionKey<State> = Symbol("store");
