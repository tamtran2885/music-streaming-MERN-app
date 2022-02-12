import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import axios from "axios";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updatePassword = (password) => updatePassword(auth, password, user);

  const getUserProfile = (user) => {
    const userReq = axios.get(`/api/user/${user.uid}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
    return userReq.data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // store the user on local storage
        // localStorage.setItem("userId", JSON.stringify(user.uid));
      } else {
        // localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        getUserProfile,
        loading,
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        loginWithGoogle,
        logout,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
