// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm-g_aiS7PorZNg_a43MD2JbOSKrFJJAs",
  authDomain: "inotebookimage.firebaseapp.com",
  projectId: "inotebookimage",
  storageBucket: "inotebookimage.appspot.com",
  messagingSenderId: "1059692993077",
  appId: "1:1059692993077:web:449c9bab0865b99463ef7c",
  measurementId: "G-FXM3CVQ111"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb=getStorage(app);