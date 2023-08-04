import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'mock_key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'mock_key',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'mock_key',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'mock_key',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'mock_key',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'mock_key',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'mock_key'
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)
// const analytics = getAnalytics(firebase);

export default firebase;