import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

export async function setNewOrder({ cartItem, address, userID, cartTotal }) {
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const data = {
    cartItem,
    address,
    orderDate: date,
    orderTime: time,
    userID,
    createdAt: Timestamp.now(),
    orderStatus: "Order Placed",
    cartTotal,
  };

  const docRef = await addDoc(collection(db, "orders"), data);

  return docRef;
}

export async function getOrders(userID) {
  let q;
  if (userID)
    q = query(collection(db, "orders"), where("userID", "==", userID));
  if (userID === "all") q = query(collection(db, "orders"));
  const querySnapshot = await getDocs(q, orderBy("createdAt", "desc"));
  const orders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return orders;
}

export async function getOrder(orderID) {
  const docRef = doc(db, "orders", orderID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    return data;
  } else {
    toast.error("No such document!");
  }
}

export async function updateOrderStatus(data) {
  const { orderID, orderStatus } = data;
  const docRef = doc(db, "orders", orderID);
  await updateDoc(docRef, {
    orderStatus: orderStatus,
  });
}

export async function getTodayOrders() {
  let date = new Date();
  let formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const q = query(
    collection(db, "orders"),
    where("orderDate", "==", formattedDate)
  );
  const querySnapshot = await getDocs(q);
  const orders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return orders;
}
