// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/auth";
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8v6vn-0W8q_VWOaBv5mQuVm5eC7gOB-o",
  authDomain: "cookifood-df399.firebaseapp.com",
  projectId: "cookifood-df399",
  storageBucket: "cookifood-df399.appspot.com",
  messagingSenderId: "641863765421",
  appId: "1:641863765421:web:38d81ed85b330d04a5e524",
};

// Initialize Firebase
if (firebase.apps.length > 0 === false) {
  firebase.initializeApp(firebaseConfig);
}
//const app = initializeApp(firebaseConfig);

export { firebase };
