import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCjYwOlCiMckF4nMgPmSg98ADwszGeD5sI",
//   authDomain: "vite-fullstack-ecommerce.firebaseapp.com",
//   projectId: "vite-fullstack-ecommerce",
//   storageBucket: "vite-fullstack-ecommerce.appspot.com",
//   messagingSenderId: "124476318814",
//   appId: "1:124476318814:web:af2fbf2543c4f89c4bc0cf",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
