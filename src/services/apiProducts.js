import { arrayUnion, getCountFromServer } from "firebase/firestore";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
  where,
  onSnapshot,
  limit,
  getDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../firebase/config";
import toast from "react-hot-toast";

// ====================================
// ====================================
// ============= Create ===============
// ====================================
// ====================================
export async function createProduct(data) {
  const {
    images_gallery,
    main_image,
    name,
    product_category,
    product_description,
    price,
    Is_New,
    best_seller,
    most_wanted,
  } = data;
  let product = {
    name,
    product_category,
    product_description,
    price: Number(price),
    Is_New,
    best_seller,
    most_wanted,
  };
  const mainFile = main_image;
  const mainStorageRef = ref(
    storage,
    `images/${Math.random() + mainFile.name}`
  );
  const mainUploadTask = uploadBytesResumable(mainStorageRef, mainFile);
  await new Promise((resolve, reject) => {
    mainUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(mainUploadTask.snapshot.ref);
        product = {
          ...product,
          main_image: downloadURL,
        };
        resolve();
      }
    );
  });
  const imageUploadPromises = images_gallery.map((img) => {
    const file = img;
    const storageRef = ref(storage, `images/${Math.random() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          toast.error(error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  });
  const ImageUrls = await Promise.all(imageUploadPromises);
  product = {
    ...product,
    images_gallery: ImageUrls,
    createdAt: Timestamp.now().toDate(),
  };
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "products"), product);
  return docRef;
}
// ====================================
// ====================================
// =========GET ALL PRODUCTS===========
// ====================================
// ====================================

export async function getProducts({
  category,
  type,
  categoryFilter,
  minPrice,
  maxPrice,
}) {
  let q;
  if (!category)
    q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  if (category && type === "home")
    q = query(
      collection(db, "products"),
      where(category, "==", "true"),
      limit(8)
    );
  if (category && type === "product")
    q = query(
      collection(db, "products"),
      where("product_category", "==", category)
    );
  if (minPrice && maxPrice) {
    q = query(
      collection(db, "products"),
      where("price", ">=", Number(minPrice)),
      where("price", "<=", Number(maxPrice))
    );
  }
  if (categoryFilter)
    q = query(
      collection(db, "products"),
      where("product_category", "==", categoryFilter)
    );

  const querySnapshot = await getDocs(q, orderBy("createdAt", "desc"));

  const allProducts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (minPrice && maxPrice && categoryFilter) {
    const filteredProducts = allProducts.filter(
      (product) =>
        product.price >= Number(minPrice) && product.price <= Number(maxPrice)
    );
    return filteredProducts;
  }
  return allProducts;
}

// ====================================
// ====================================
// =======GET SPECIFIC PRODUCT=========
// ====================================
// ====================================

export async function getProduct(id) {
  let product = {};
  const docRef = doc(db, "products", id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      product = {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }

  return product;
}

// ====================================
// ====================================
// ==========DeleteProduct=============
// ====================================
// ====================================

export async function deleteProduct({ id, imagesUrl }) {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
    if (imagesUrl) {
      const uniqueImageUrl = Array.from(new Set(imagesUrl));
      await Promise.all(
        uniqueImageUrl.map(async (url) => {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        })
      );
    }
    toast.success("Product Deleted Successfully");
  } catch (error) {
    toast.error("Something Went Wrong");
  }
}

// ====================================
// ====================================
// ==========Update Product============
// ====================================
// ====================================

export async function updateProduct(newData) {
  const {
    name,
    Is_New,
    price,
    product_category,
    product_description,
    id,
    old_main_image,
    old_images_gallery,
    best_seller,
    most_wanted,
  } = newData;
  let { images_gallery, main_image } = newData;

  try {
    // Check if main_image is a file (i.e., user has uploaded a new image)
    if (
      main_image instanceof File &&
      images_gallery.some((image) => image instanceof File) === false
    ) {
      // Delete old main image from firebase storage

      const oldImageRef = ref(storage, old_main_image);
      await deleteObject(oldImageRef);
      // Upload new main image to firebase storage
      const mainImageRef = ref(
        storage,
        `images/${Math.random() + main_image.name}`
      );
      await uploadBytes(mainImageRef, main_image);
      // Get URL of new main image
      main_image = await getDownloadURL(mainImageRef);
    }
    // Check if images_gallery contains any files (i.e., user has uploaded new images)
    if (
      images_gallery.some((image) => image instanceof File) &&
      main_image instanceof File === false
    ) {
      // Delete old images from firebase storage
      await Promise.all(
        old_images_gallery.map(async (url) => {
          const oldImageRef = ref(storage, url);
          await deleteObject(oldImageRef);
        })
      );
      // Upload new images to firebase storage and get their URLs
      images_gallery = await Promise.all(
        images_gallery.map(async (image) => {
          if (image instanceof File) {
            const imageRef = ref(
              storage,
              `images/${Math.random() + image.name}`
            );
            await uploadBytes(imageRef, image);
            return await getDownloadURL(imageRef);
          } else {
            // If image is not a file, it's a URL of an old image that hasn't been changed
            return image;
          }
        })
      );
    }
    if (
      images_gallery.some((image) => image instanceof File) &&
      main_image instanceof File
    ) {
      // Delete old main image from firebase storage
      const oldImageRef = ref(storage, old_main_image);
      await deleteObject(oldImageRef);
      // Upload new main image to firebase storage
      const mainImageRef = ref(
        storage,
        `images/${Math.random() + main_image.name}`
      );
      await uploadBytes(mainImageRef, main_image);
      // Get URL of new main image
      main_image = await getDownloadURL(mainImageRef);

      // Check if images_gallery contains any files (i.e., user has uploaded new images)
      // Delete old images from firebase storage
      await Promise.all(
        old_images_gallery.map(async (url) => {
          const oldImageRef = ref(storage, url);
          await deleteObject(oldImageRef);
        })
      );
      // Upload new images to firebase storage and get their URLs
      images_gallery = await Promise.all(
        images_gallery.map(async (image) => {
          if (image instanceof File) {
            const imageRef = ref(
              storage,
              `images/${Math.random() + image.name}`
            );
            await uploadBytes(imageRef, image);
            return await getDownloadURL(imageRef);
          } else {
            // If image is not a file, it's a URL of an old image that hasn't been changed
            return image;
          }
        })
      );
    }
    // Update product document in firestore
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      name,
      Is_New,
      images_gallery,
      main_image,
      price,
      product_category,
      product_description,
      best_seller,
      most_wanted,
    });
    toast.success("Product Updated Successfully");
  } catch (error) {
    toast.error("Something Went Wrong");
  }
}

export async function setReview(data) {
  const { productId, ...otherData } = data;
  const docRef = doc(db, "products", productId);
  await updateDoc(docRef, {
    reviews: arrayUnion(otherData),
  });
  toast.success("Review Added Successfully");
}

export async function getProductsCount() {
  const coll = collection(db, "products");
  const snapshot = await getCountFromServer(coll);
  console.log("count: ", snapshot.data().count);
  const count = snapshot.data().count;
  return count;
}
