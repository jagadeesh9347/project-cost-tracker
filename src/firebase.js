// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDoVlihBs85gkQsjYfkFuVZz9BDGn87vVM",
    authDomain: "project-cost-tracker-85232.firebaseapp.com",
    projectId: "project-cost-tracker-85232",
    storageBucket: "project-cost-tracker-85232.firebasestorage.app",
    messagingSenderId: "26871886806",
    appId: "1:26871886806:web:142304689dbfe145382a77"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
