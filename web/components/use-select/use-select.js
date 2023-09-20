import { reactive } from "vue";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { useFirebase } from "@lib/firebase";

export function useSelect(name) {
  const firebase = useFirebase();
  if (firebase.selects[name]) return firebase.selects[name];

  const select = reactive({
    list: [],
    hash: {},
    busy: true,
    unsubscribe: () => null,
  });

  const db = getFirestore(firebase.app);
  const queryRef = collection(db, name);
  select.unsubscribe = onSnapshot(queryRef, (snapshot) => {
    select.list = [];
    select.hash = {};
    select.busy = true;
    snapshot.docs.forEach((doc) => {
      const item = createItem(doc);
      select.list.push(item);
      select.hash[item.id] = item;
    });
    select.busy = false;
  });

  firebase.selects[name] = select;

  return select;
}

function createItem(doc) {
  const item = Object.entries(doc.data()).reduce((acc, [field, value]) => {
    // if is a firestore timestamp then convert to a js date object
    const parsedValue = value?.toDate ? value.toDate() : value;
    acc[field] = parsedValue;
    return acc;
  }, {});
  item.id = doc.id;
  return item;
}
