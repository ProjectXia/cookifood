import { firebase } from "./firebaseConfig";

function uploadImage(imgUri, docId) {
  makeBlob(imgUri)
    .then((imageBlob) => {
      const userStorageRef = firebase.storage().ref("profiles/");
      userStorageRef
        .child(docId)
        .put(imageBlob)
        .then((uploadResponse) => {})
        .catch((uploadError) => {});
    })
    .catch((blobError) => {});
}

const makeBlob = async (img) => {
  const blobInMaking = await fetch(img);

  const theBlob = await blobInMaking.blob();

  return theBlob;
};

export { uploadImage, makeBlob };
