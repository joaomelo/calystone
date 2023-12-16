import { writeBatch, doc, getFirestore } from "firebase/firestore";

export class FirestoreMutator {
  firestore;

  constructor(app) {
    this.firestore = getFirestore(app);
  }

  async mutate(manifests) {
    const batch = writeBatch(this.firestore);

    for (const manifest of manifests) {
      const { name, method, record } = manifest;
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
