import { firestore } from "../src/firebaseSetup";
import { ResponseData } from "../src/types";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

const userDictionaryRef = (userId: string) =>
  collection(doc(collection(firestore, "users"), userId), "dictionary");

const updateOccurrences = async (
  record: ResponseData,
  docRef: any
): Promise<number> => {
  const currentDoc = await getDoc(docRef);
  if (currentDoc.exists()) {
    const currentData = currentDoc.data() as ResponseData;
    return Number(record.occurrences) + Number(currentData.occurrences);
  }
  return Number(record.occurrences);
};

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

    const docRef = doc(userDictionaryRef(userId), record.original_text);
    record.occurrences = await updateOccurrences(record, docRef);

    batch.set(docRef, record, { merge: true });
  }

  await batch.commit();
};

export const fetchUserDictionary = async (userId: string) => {
  const q = query(userDictionaryRef(userId), orderBy("occurrences", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => docSnap.data() as ResponseData);
};
