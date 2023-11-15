export function parseDoc(doc) {
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
