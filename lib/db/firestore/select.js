import {
  collection as createCollection,
  onSnapshot,
  query as createQuery,
  where as createWhere,
} from "firebase/firestore";

export class SelectFirestoreAdapter {
  driver;

  constructor(driver) {
    this.driver = driver;
  }

  select({ name, wheres, observer }) {
    const { firestore } = this.driver;
    const dbCollection = createCollection(firestore, name);
    const dbWheres = wheres.map(({ field, operator, value }) =>
      createWhere(field, operator, value)
    );
    const dbQuery = createQuery(dbCollection, ...dbWheres);
    return onSnapshot(dbQuery, (snapshot) => {
      const records = [];
      snapshot.docs.forEach((doc) => {
        const record = parseDoc(doc);
        records.push(record);
      });
      observer(records);
    });
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
    { id: doc.id }
  );
}
