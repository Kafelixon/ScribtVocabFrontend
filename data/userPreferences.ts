import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../src/firebaseSetup";

// Define a UserPreferences type
type UserPreferences = {
  theme: string;
};

export const getUserPreferences = async (
  uid: string | null
): Promise<UserPreferences | null> => {
  if (!uid) {
    return null;
  }
  try {
    const docSnap = await getDoc(doc(firestore, "users", uid));
    if (docSnap.exists()) {
      const userPrefs: UserPreferences = docSnap.data() as UserPreferences;
      return userPrefs;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setUserPreferences = async (
  uid: string | null,
  preferences: UserPreferences
) => {
  if (!uid) {
    return null;
  }
  console.log("setting user preferences to: ");
  console.log(preferences);
  try {
    await setDoc(doc(firestore, "users", uid), preferences);
  } catch (e) {
    console.error(e);
  }
};

export const updateUserPreferences = async (
  uid: string | null,
  preferences: any
) => {
  if (!uid) {
    return null;
  }
  console.log("updating user preferences to: ");
  console.log(preferences);
  try {
    await updateDoc(doc(firestore, "users", uid), preferences, { merge: true });
  } catch (e) {
    console.error(e);
  }
};
