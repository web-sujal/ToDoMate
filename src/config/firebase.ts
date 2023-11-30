import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgNRFLyyQ3ryI3pfcAu6x6G-W5NR_h5Ag",
  authDomain: "todomate-f955d.firebaseapp.com",
  projectId: "todomate-f955d",
  storageBucket: "todomate-f955d.appspot.com",
  messagingSenderId: "978333209103",
  appId: "1:978333209103:web:706f2b0b4c6960974d097a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
