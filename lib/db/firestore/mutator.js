import { writeBatch, doc } from "firebase/firestore";

export class MutatorFirestoreAdapter {
  firestore;

  constructor(firestore) {
    this.firestore = firestore;
  }

  async mutate(mutations) {
    const batch = writeBatch(this.firestore);

    for (const mutation of mutations) {
      const { name, method, record } = mutation;
      const docRef = doc(this.firestore, name, record.id);

      switch (method) {
        case "add":
          batch.set(docRef, record);
          break;
        case "put":
          batch.update(docRef, record);
          break;
        case "del":
          batch.delete(docRef);
          break;
        default:
          throw new Error(
            `The value "${method}" is not a valid method to execute a mutation`
          );
      }
    }

    await batch.commit();
  }
}
