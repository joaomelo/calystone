import { combineLatest } from "rxjs";

export function subscribe(observables, observer) {
  const observable = combineLatest(observables.map((o) => o._subject));
  const subscription = observable.subscribe(observer);
  return () => subscription.unsubscribe();
}
