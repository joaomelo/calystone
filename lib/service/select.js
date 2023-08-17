import { combineLatest } from "rxjs";

export function select(selectables, observer) {
  const observable = combineLatest(selectables.map((s) => s._subject));
  const subscription = observable.subscribe(observer);
  return () => subscription.unsubscribe();
}
