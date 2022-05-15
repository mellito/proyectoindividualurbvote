import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { auth, fireStore, storage } from "../../utils/firebase/firebaseconfig";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("there is not auth provider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setSessionUser(currentUser);
      setLoading(false);
    });
  }, []);

  const useSweetAlert = (title, message, tipeIcon) => {
    MySwal.fire(title, message, tipeIcon);
  };

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      return useSweetAlert("Fibase error", error.message, "error");
    }
  };

  const googleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      return useSweetAlert("Fibase error", error.message, "error");
    }
  };

  const updateUser = async () => {
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

  const resetPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return useSweetAlert("Fibase error", error.message, "error");
    }
  };

  const createUrbanization = async (data) => {
    try {
      const docRef = doc(
        fireStore,
        `${sessionUser.email}`,
        `${data.identification}`,
      );
      return await setDoc(docRef, data);
    } catch (error) {
      return useSweetAlert("Fibase error", error.message, "error");
    }
  };

  const fileHandler = async (e, urbanizationName) => {
    try {
      const localFile = e.files[0];
      const fileRef = ref(storage, `${urbanizationName}/${localFile.name}`);
      await uploadBytes(fileRef, localFile);
      const urlDown = await getDownloadURL(fileRef);
      return urlDown;
    } catch (error) {
      return useSweetAlert("Fibase error", error.message, "error");
    }
  };

  const getAllUrbanization = async () => {
    const docRef = await getDocs(collection(fireStore, `${sessionUser.email}`));
    let infor = [];
    docRef.forEach((docInf) => {
      infor = [...infor, docInf.data()];
    });
    return infor;
  };

  const data = useMemo(() => ({
    signup,
    login,
    sessionUser,
    logOut,
    loading,
    useSweetAlert,
    googleLogin,
    updateUser,
    resetPassword,
    createUrbanization,
    fileHandler,
    getAllUrbanization,
  }));
  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};