import { asArray } from "@lib";
import { query, where } from "firebase/firestore";

export function createQuery(collection, maybeFilters) {
  if (!maybeFilters) return collection;
  const wheres = createWheres(maybeFilters);
  return query(collection, ...wheres);
}

export function createWheres(maybeFilters) {
  const filters = asArray(maybeFilters);
  return filters.map(({ field, operator, value }) =>
    where(field, operator, value)
  );
}
