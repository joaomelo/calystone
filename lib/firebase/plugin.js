import { inject } from "vue";

const key = Symbol("firebase");

export function install({ firebase, app }) {
  app.provide(key, firebase);
}

export function useFirebase() {
  const firebase = inject(key);
  return firebase;
}
