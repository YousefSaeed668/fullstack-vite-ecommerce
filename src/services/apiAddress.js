import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function setUserAddress(data) {
  const { userID } = data;

  const docRef = doc(db, "address", userID); // Use the userID as the document ID

  const res = await setDoc(docRef, data, { merge: true });

  return res;
}

export async function getUserAddress(id) {
  const docRef = doc(db, "address", id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
