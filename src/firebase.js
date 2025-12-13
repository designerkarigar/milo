import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "miloapp-d189a.firebaseapp.com",
    projectId: "miloapp-d189a",
    storageBucket: "miloapp-d189a.appspot.com",
    messagingSenderId: "618712475427",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-S199WPTLLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;