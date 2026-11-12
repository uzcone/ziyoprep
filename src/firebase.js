import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "O'ZINGIZNING_API_KEY",
  authDomain: "O'ZINGIZNING_AUTH_DOMAIN",
  projectId: "O'ZINGIZNING_PROJECT_ID",
  storageBucket: "O'ZINGIZNING_STORAGE_BUCKET",
  messagingSenderId: "O'ZINGIZNING_SENDER_ID",
  appId: "O'ZINGIZNING_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
