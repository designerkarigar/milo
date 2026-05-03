import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Validate required environment variables
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
    throw new Error(
        "Missing REACT_APP_FIREBASE_API_KEY environment variable. " +
        "Please set it in AWS Amplify console under App Settings > Environment variables."
    );
}

if (!process.env.REACT_APP_FIREBASE_APP_ID) {
    throw new Error(
        "Missing REACT_APP_FIREBASE_APP_ID environment variable. " +
        "Please set it in AWS Amplify console under App Settings > Environment variables."
    );
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "miloapp-d189a.firebaseapp.com",
    projectId: "miloapp-d189a",
    storageBucket: "miloapp-d189a.appspot.com",
    messagingSenderId: "618712475427",
    // Firebase web appId must remain in full format:
    // "1:<sender-id>:web:<app-hash>"
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-S199WPTLLQ"
};

// Validate configuration before initialization
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API key is missing. Check REACT_APP_FIREBASE_API_KEY environment variable.");
}

if (!firebaseConfig.appId) {
    throw new Error("Firebase App ID is missing. Check REACT_APP_FIREBASE_APP_ID environment variable.");
}

// Debug: Log configuration (without exposing full API key)
if (process.env.NODE_ENV === "development") {
    console.log("Firebase Config:", {
        apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : "missing",
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
        appId: firebaseConfig.appId,
        messagingSenderId: firebaseConfig.messagingSenderId,
    });
    console.log("Environment variables check:", {
        hasApiKey: !!process.env.REACT_APP_FIREBASE_API_KEY,
        hasAppId: !!process.env.REACT_APP_FIREBASE_APP_ID,
        rawAppId: process.env.REACT_APP_FIREBASE_APP_ID,
    });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);

// Import diagnostics (runs automatically in development)
if (process.env.NODE_ENV === "development") {
    import("./utils/firebaseDiagnostics");
}

export default app;