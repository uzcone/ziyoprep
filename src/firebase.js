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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIWyXal_We9nITuvdWjUfG0KJ7ET-xij8",
  authDomain: "ziyoprep.firebaseapp.com",
  projectId: "ziyoprep",
  storageBucket: "ziyoprep.firebasestorage.app",
  messagingSenderId: "427182718066",
  appId: "1:427182718066:web:0b68aae20359979b4a56eb",
  measurementId: "G-NCBDRXVRFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
