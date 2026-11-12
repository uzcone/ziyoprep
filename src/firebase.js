import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Console (console.firebase.google.com) dan olgan o'z kalitlaringni shu yerga qo'yasan:
const firebaseConfig = {
  apiKey: "SIZNING_API_KEY",
  authDomain: "SIZNING_PROJECT_ID.firebaseapp.com",
  projectId: "SIZNING_PROJECT_ID",
  storageBucket: "SIZNING_PROJECT_ID.appspot.com",
  messagingSenderId: "SIZNING_SENDER_ID",
  appId: "SIZNING_APP_ID"
};

let auth = null;
let googleProvider = null;
let db = null;

try {
  // Agar kalitlar hali kiritilmagan bo'lsa, ilova xato bermay Demo rejimda ishlayveradi
  if (firebaseConfig.apiKey !== "SIZNING_API_KEY") {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
  }
} catch (error) {
  console.warn("Firebase hali ulanmagan, Demo Auth rejimi faol:", error);
}

export { auth, googleProvider, db };
