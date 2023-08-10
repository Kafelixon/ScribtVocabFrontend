import { firestore } from "../src/firebaseSetup";
import { ResponseData } from "../src/types";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  getDoc,
} from "firebase/firestore";

const userDictionaryRef = (userId: string) =>
  collection(doc(collection(firestore, "users"), userId), "dictionary");
export const saveToUserDictionary = async (
  userId: string,
  responseData: ResponseData[]
) => {
  if (!userId) throw new Error("User ID is not provided.");

  const batch = writeBatch(firestore);

  for (const record of responseData) {
    if (!record.original_text) {
      console.error("Original text is missing or empty for record:", record);
      continue;
    }

    const docRef = doc(
      collection(firestore, "users", userId, "dictionary"),
      record.original_text
    );

    const currentDoc = await getDoc(docRef);
    if (currentDoc.exists()) {
      const currentData = currentDoc.data() as ResponseData;
      record.occurrences =
        Number(record.occurrences) + Number(currentData.occurrences);
    }

    batch.set(docRef, record, { merge: true });
  }

  await batch.commit();
};

import { query, orderBy } from "firebase/firestore";

export const fetchUserDictionary = async (userId: string) => {
  const q = query(userDictionaryRef(userId), orderBy("occurrences", "desc"));
  const snapshot = await getDocs(q);

  const dictionary: ResponseData[] = [];
  snapshot.forEach((docSnap) =>
    dictionary.push(docSnap.data() as ResponseData)
  );
  return dictionary;
};
