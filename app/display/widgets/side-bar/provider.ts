import { inject, type InjectionKey, type MaybeRefOrGetter, provide } from "vue";

interface Provider {
  active: MaybeRefOrGetter<string>,
  "update:active": (value: string) => void
};

export const key = Symbol() as InjectionKey<Provider>;

export function provideProvider(provider: Provider) {
  provide(key, provider);
}

export function useProvider() {
  const provider = inject(key);
  if (!provider) throw new Error("No provider was found");
  return provider;
}