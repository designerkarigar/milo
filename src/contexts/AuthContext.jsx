import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { _Logout } from "../utils/Functions/Authentication/_Logout";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    const [firebaseResult, cognitoResult] = await Promise.allSettled([
      firebaseSignOut(auth),
      _Logout(),
    ]);

    // Ensure UI immediately reflects logged-out state even if one provider fails.
    setCurrentUser(null);

    if (firebaseResult.status === "rejected") {
      console.error("Firebase sign out failed:", firebaseResult.reason);
    }
    if (cognitoResult.status === "rejected") {
      console.error("Cognito sign out failed:", cognitoResult.reason);
    }
  };

  const value = {
    currentUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

