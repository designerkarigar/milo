import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../../firebase";

export const uploadPetImageToFirebase = async ({ file, currentUser }) => {
  if (!file) {
    throw new Error("Missing image file");
  }

  const firebaseUid = currentUser?.uid || auth.currentUser?.uid;
  if (!firebaseUid) {
    throw new Error("Please login before uploading pet photos");
  }

  const extensionFromName =
    file.name && file.name.includes(".") ? file.name.split(".").pop() : "";
  const extensionFromType =
    file.type && file.type.includes("/") ? file.type.split("/").pop() : "";
  const extension = extensionFromName || extensionFromType || "jpg";
  const objectPath = `users/${firebaseUid}/uploads/${Date.now()}${Math.round(
    Math.random() * 1e6
  )}.${extension}`;
  const imageRef = ref(storage, objectPath);

  await uploadBytes(imageRef, file, {
    contentType: file.type || "image/jpeg",
  });
  return getDownloadURL(imageRef);
};

