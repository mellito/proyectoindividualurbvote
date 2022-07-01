import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { fireStore } from "./firebase/firebaseconfig";
import useSweetAlert from "./useSweetAlert";

const houseRef = async ({ sessionUser, id }) => {
  const docRef = doc(fireStore, sessionUser.email, id);
  const docSnap = await getDoc(docRef);
  const { house } = docSnap.data();
  return { docRef, house };
};

export const createVote = async (initialData, codevote) => {
  try {
    const docRef = doc(fireStore, "vote", codevote);
    return await setDoc(docRef, initialData);
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const getAllUrbanization = async (sessionUser) => {
  try {
    const docRef = await getDocs(collection(fireStore, sessionUser.email));
    let infor = [];
    docRef.forEach((docInf) => {
      infor = [...infor, docInf.data()];
    });
    return infor;
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const updateActiveHouse = async (id, houseNumber, sessionUser) => {
  try {
    const { docRef, house } = await houseRef({ sessionUser, id });
    const { votacion } = house[houseNumber];
    await updateDoc(docRef, {
      house: {
        ...house,
        [houseNumber]: { ...house[houseNumber], votacion: !votacion },
      },
    });
  } catch (error) {
    useSweetAlert("Fibase error", error.message, "error");
  }
};

export const addHouse = async (id, data, sessionUser) => {
  const { housenumber } = data;
  try {
    const { docRef, house } = await houseRef({ sessionUser, id });
    await updateDoc(docRef, { house: { ...house, [housenumber]: data } });
  } catch (error) {
    useSweetAlert("Fibase error", error.message, "error");
  }
};

export const createUrbanization = async (data, sessionUser) => {
  try {
    const docRef = doc(fireStore, sessionUser.email, data.identification);
    return await setDoc(docRef, data);
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const realtimeCollectionCheck = async (id, setHouse, sessionUser) => {
  try {
    const unsub = onSnapshot(doc(fireStore, sessionUser.email, id), (house) => {
      setHouse(house.data());
    });
    return unsub;
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const realtimeCollectionVote = async (setVoteCollection, code) => {
  try {
    const unsub = onSnapshot(doc(fireStore, "vote", code), (vote) => {
      setVoteCollection(vote.data());
    });
    return unsub;
  } catch (error) {
    return useSweetAlert("Fibase error", error.message, "error");
  }
};

export const addquestion = async (codevote, questionToAdd) => {
  const docRef = doc(fireStore, "vote", codevote);
  const docData = await getDoc(docRef);
  const { questions } = docData.data();
  const newQuestion = {
    [Object.values(questions).length + 1]: {
      questionToAdd,
      yes: [],
      not: [],
      state: true,
    },
  };
  updateDoc(docRef, { questions: { ...questions, ...newQuestion } });
};

export const checkVoteHouse = async (code) => {
  try {
    const docRef = doc(fireStore, "vote", code);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      const data = docData.data();
      return data;
    }
    return useSweetAlert("error", "codigo de votacion no encontrado", "error");
  } catch (error) {
    return useSweetAlert("error", error.message, "error");
  }
};

export const resetVoteActive = async (listVoteHouse, code) => {
  try {
    const { houseVoteActive, questions } = listVoteHouse;
    let houseRestObj = {};
    Object.values(houseVoteActive).forEach((houseActive) => {
      houseRestObj = {
        ...houseRestObj,
        [houseActive.housenumber]: { ...houseActive, votacion: true },
      };
    });

    const docRef = doc(fireStore, "vote", code);
    return updateDoc(docRef, {
      houseVoteActive: houseRestObj,
      questions: {
        ...questions,
        [Object.keys(questions).length]: {
          ...questions[Object.keys(questions).length],
          state: false,
        },
      },
    });
  } catch (error) {
    return useSweetAlert("error", error.message, "error");
  }
};

export const addVote = async (choice, house, code, listVoteHouse) => {
  try {
    const { questions, houseVoteActive } = listVoteHouse;

    const docRef = doc(fireStore, "vote", code);
    updateDoc(docRef, {
      questions: {
        ...questions,
        [Object.keys(questions).length]: {
          ...questions[Object.keys(questions).length],
          [choice]:
            questions[Object.keys(questions).length][choice].concat(house),
        },
      },
      houseVoteActive: {
        ...houseVoteActive,
        [house]: { ...houseVoteActive[house], votacion: false },
      },
    });
    return null;
  } catch (error) {
    return useSweetAlert("error", error.message, "error");
  }
};

export const endVote = async (code, id, sessionUser) => {
  try {
    const docRef = doc(fireStore, sessionUser.email, id);
    const voteRef = doc(fireStore, "vote", code);
    const docData = await getDoc(docRef);

    const { house } = docData.data();

    let houseRestObj = {};
    Object.values(house).forEach((houseEnd) => {
      houseRestObj = {
        ...houseRestObj,
        [houseEnd.housenumber]: { ...houseEnd, votacion: false },
      };
    });

    await updateDoc(voteRef, { state: false });
    await updateDoc(docRef, { house: houseRestObj });
    return null;
  } catch (error) {
    return useSweetAlert("error", error.message, "error");
  }
};
