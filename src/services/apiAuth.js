import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../firebase/config";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export async function signup({ email, password }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success("Signed up successfully!");
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function signIn({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast.success("Signed in successfully!");
    return user;
  } catch (error) {
    const errorMessage = error.message;
    toast.error("Email Or Password is incorrect!");
    throw new Error(errorMessage);
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    toast.success("Signed in with Google successfully!");
    return auth.currentUser;
  } catch (error) {
    toast.error("Something went wrong!");
    throw error;
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
}

export function signOut() {
  auth
    .signOut()
    .then(() => {
      toast.success("Signed out successfully!");
    })
    .catch((error) => {
      toast.error("Something went wrong!");
    });
}

export function updateUserProfile({ name, file, password }) {
  return new Promise((resolve, reject) => {
    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          toast.success("Password updated successfully!");
          resolve(auth.currentUser);
        })
        .catch((error) => {
          reject(error);
        });
    }
    if (file) {
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: downloadURL,
            })
              .then(() => {
                toast.success("Profile updated successfully!");
                resolve(auth.currentUser);
              })
              .catch((error) => {
                reject(error);
              });
          });
        }
      );
    } else {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          toast.success("Profile updated successfully!");
          resolve(auth.currentUser);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
