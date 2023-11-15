import { doc, setDoc } from "firebase/firestore";

export async function put({ payload, name, driver }) {
  const firestore = driver.firestore;

  const payloadWithMetadata = {
    ...payload,
    updatedAt: new Date(),
  };

  const docRef = doc(firestore, name, payload.id);
  await setDoc(docRef, payloadWithMetadata, { merge: true });
}
