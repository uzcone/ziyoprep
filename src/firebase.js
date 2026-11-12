import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIWyXal_We9nITuvdWjUfG0KJ7ET-xij8",
  authDomain: "ziyoprep.firebaseapp.com",
  projectId: "ziyoprep",
  storageBucket: "ziyoprep.firebasestorage.app",
  messagingSenderId: "427182718066",
  appId: "1:427182718066:web:0b68aae20359979b4a56eb",
  measurementId: "G-NCBDRXVRFD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
