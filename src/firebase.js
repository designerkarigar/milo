import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYlmxnQzbhZ9hFArTifCIUr4-vLEjqXx8",
    authDomain: "miloapp-d189a.firebaseapp.com",
    projectId: "miloapp-d189a",
    storageBucket: "miloapp-d189a.appspot.com",
    messagingSenderId: "618712475427",
    appId: "1:618712475427:web:f1bc181eee2483ac744e96",
    measurementId: "G-S199WPTLLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;