import {
  collection as createCollection,
  orderBy as createOrderBy,
  query as createQuery,
  where as createWhere,
  onSnapshot,
} from "firebase/firestore";

export class FirestoreSelectorAdapter {
  firestore;

  constructor(firestore) {
    this.firestore = firestore;
  }

  subscribe(query, observer) {
    const { name, orderBy, wheres } = query;

    const dbCollection = createCollection(this.firestore, name);
    const dbConstraints = wheres.map(({ field, operator, value }) =>
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
