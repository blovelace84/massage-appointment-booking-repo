import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdOWL5UL1NSshnyfx4adnS0wVxk-6x-yY",
  authDomain: "massage-booking-app-6e92e.firebaseapp.com",
  projectId: "massage-booking-app-6e92e.firebaseapp.com",
  storageBucket: "massage-booking-app-6e92e.firebasestorage.app",
  messagingSenderId: "690396229197",
  appId: "1:690396229197:web:0c645ba8fb6e2726f53604"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
