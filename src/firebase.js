// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfW-09oatPG5UtvckBySaXKB4dJ5nn-Qc",
  authDomain: "auth-f9c66.firebaseapp.com",
  projectId: "auth-f9c66",
  storageBucket: "auth-f9c66.appspot.com",
  messagingSenderId: "239986675719",
  appId: "1:239986675719:web:39fe2398da17eadc439aa2",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
