import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Extract app ID from GMPID format if needed
// GMPID format: "1:618712475427:web:f1bc181eee2483ac744e96"
// App ID should be: "f1bc181eee2483ac744e96"
const getAppId = (appIdOrGmpid) => {
    // If it's in GMPID format (contains colons), extract the last part
    if (appIdOrGmpid.includes(":")) {
        const parts = appIdOrGmpid.split(":");
        return parts[parts.length - 1];
    }
    // Otherwise, use as-is
    return appIdOrGmpid;
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "miloapp-d189a.firebaseapp.com",
    projectId: "miloapp-d189a",
    storageBucket: "miloapp-d189a.appspot.com",
    messagingSenderId: "618712475427",
    appId: getAppId(process.env.REACT_APP_FIREBASE_APP_ID),
    measurementId: "G-S199WPTLLQ"
};

// Debug: Log configuration (without exposing full API key in production)
if (process.env.NODE_ENV === "development") {
    console.log("Firebase Config:", {
        ...firebaseConfig,
        apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : "missing",
    });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;