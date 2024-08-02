import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import app from "./config";
import { RcFile } from "antd/lib/upload";
import { getFormattedDate } from "../assets/functions";

const storage = getStorage(app);

export const uploadPackagePhotos = async (file: File, directory: string) => {
  const storage = getStorage(app);
  return new Promise((resolve, reject) => {
    const uploadUrl = `packages${directory}/${file.name}`;
    console.log("uploadUrl", uploadUrl);
    const storageRef = ref(storage, uploadUrl);
    console.log(file, "inf irebase calls");
    uploadBytes(storageRef, file)
      .then((snapshot: any) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpload = async (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${getFormattedDate()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress function ...
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Error function ...
        console.error('Upload failed', error);
        // message.error(`${file.name} file upload failed.`);
        reject(error);
      },
      () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // message.success(`${file.name} file uploaded successfully`);
          resolve(downloadURL);
        });
      }
    );
  });
};


export const deletePhoto = async (photoUrl: string) => {
  const storage = getStorage(app);
  const photoRef = ref(storage, photoUrl);
  try {
    await deleteObject(photoRef);
    console.log("File deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

export const handleCategoryImageUpload = async (file: File) => {
  try {
    return await uploadPackagePhotos(file, "/fhc/images");
  } catch (error) {
    console.log("Error uploading image:", error);
    return null;
  }
};

export const handlePackagePDFUpload = async (file?: File) => {
  if (!file) {
    console.log("Error no file provided for pdf");
    return null;
  }
  try {
    return await uploadPackagePhotos(file, "/pdf");
  } catch (error) {
    console.log("Error uploading image:", error);
    return null;
  }
};

export const uploadImageAndGetURL = async (path: string, file: File) => {
  const imagesRef = ref(storage, `/fhc/images/${path}`);
  await uploadBytes(imagesRef, file);
  console.log("Uploaded an image");
  const url = await getDownloadURL(imagesRef);
  return url;
};
