import { arrayRemove, arrayUnion, doc, writeBatch } from "firebase/firestore";

export class FirestoreMutatorAdapter {
  firestore;

  constructor(firestore) {
    this.firestore = firestore;
  }

  arrayAdd(value) {
    return arrayUnion(value);
  }

  arrayDel(value) {
    return arrayRemove(value);
  }

  async mutate(manifest) {
    const batch = writeBatch(this.firestore);

    for (const mutation of manifest.list()) {
      const { method, name, record } = mutation;
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
            `The value "${method}" is not a valid method to execute a mutation`,
          );
      }
    }

    await batch.commit();
  }
}
