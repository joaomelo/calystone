import { combineLatest } from "rxjs";

export function select(datasets, observer) {
  const observable = combineLatest(datasets.map((o) => o._subject));
  const subscription = observable.subscribe(observer);
  return () => subscription.unsubscribe();
}
