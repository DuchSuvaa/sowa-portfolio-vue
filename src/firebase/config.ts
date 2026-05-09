import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAgmvS1ai_3LQ0njN_sGSSCa-KS-O2ptGQ",
  authDomain: "sowa-984bb.firebaseapp.com",
  projectId: "sowa-984bb",
  storageBucket: "sowa-984bb.firebasestorage.app",
  messagingSenderId: "1051046838473",
  appId: "1:1051046838473:web:831a75791bcf2232c48d18"
}


// init
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage }
