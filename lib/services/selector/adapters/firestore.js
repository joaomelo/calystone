import {
  collection as createCollection,
  orderBy as createOrderBy,
  query as createQuery,
  where as createWhere,
  onSnapshot,
} from "firebase/firestore";

export class FirestoreSelector {
  firestore;
  selects = new Map();

  constructor(firestore) {
    this.firestore = firestore;
  }

  get(name) {
    return this.selects.get(name);
  }

  open(select, observer) {
    const { name, orderBy, where } = select.query;

    this.selects.set(name, select);

    const dbCollection = createCollection(this.firestore, name);
    const dbConstraints = where.map(({ field, operator, value }) =>
      createWhere(field, operator, value),
    );
    if (typeof orderBy === "string") {
      dbConstraints.push(createOrderBy(orderBy));
    }
    const dbQuery = createQuery(dbCollection, ...dbConstraints);

    const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
      const records = [];
      snapshot.docs.forEach((doc) => {
        const record = parseDoc(doc);
        records.push(record);
      });
      observer(records);
    });

    return unsubscribe;
  }
}

function parseDoc(doc) {
  return Object.entries(doc.data()).reduce(
    (acc, [field, value]) => {
      // if is a firestore timestamp then convert to a js date object
      const parsedValue = value?.toDate ? value.toDate() : value;
      acc[field] = parsedValue;
      return acc;
    },
    { id: doc.id },
  );
}
