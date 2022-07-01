import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import useSweetAlert from "./useSweetAlert";
import { auth } from "./firebase/firebaseconfig";

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const googleLogin = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const authUser = (setSessionUser, setLoading) => {
  onAuthStateChanged(auth, (currentUser) => {
    setSessionUser(currentUser);
    setLoading(false);
  });
};

export const resetPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const updateUser = async () => {
  try {
    return await updateProfile(auth.currentUser, {
      displayName: "ADMIN",
      photoURL:
        "https://thumbs.dreamstime.com/z/inicio-de-sesi%C3%B3n-administrador-en-el-icono-del-port%C3%A1til-vector-stock-166205404.jpg",
    });
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};
