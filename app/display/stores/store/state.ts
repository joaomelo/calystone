import type { InjectionKey, Ref } from "vue";

export type State<T> = Ref<T>;
export type ProviderKey<T> = InjectionKey<State<T>>;
