import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../src/firebaseSetup";

export const useUserSettings = (uid: string | null) => {
  const docRef = doc(firestore, "users", uid || "default");

  const getUserSettings = async () => {
    if (!uid) {
      return null;
    }
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().theme;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const setUserSettings = async (theme: any) => {
    if (!uid) {
      return null;
    }
    try {
      await setDoc(docRef, { theme });
    } catch (e) {
      console.error(e);
    }
  };

  return { getUserSettings, setUserSettings };
};
