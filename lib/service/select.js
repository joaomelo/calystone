import { combineLatest } from "rxjs";
import { filter } from "rxjs/operators";

export function select(selectables, observer) {
  const observable = combineLatest(selectables.map((s) => s._subject)).pipe(
    filter((values) => {
      const allNull = values.every((value) => value === null);
      const allNotNull = values.every((value) => value !== null);
      return allNull || allNotNull;
    })
  );
  const subscription = observable.subscribe(observer);
  return () => subscription.unsubscribe();
}
