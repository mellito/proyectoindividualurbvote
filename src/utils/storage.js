import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useSweetAlert from "./useSweetAlert";
import { storage } from "./firebase/firebaseconfig";

const fileHandler = async (e, urbanizationName) => {
  try {
    const localFile = e.target.files[0];
    const fileRef = ref(storage, `${urbanizationName}/${localFile.name}`);
    await uploadBytes(fileRef, localFile);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export default fileHandler;
