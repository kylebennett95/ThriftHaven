import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrlT6jYJNFZhQrLlJBTfhWhe1FbI0mf78",
    authDomain: "thrifthaven-22179.firebaseapp.com",
    projectId: "thrifthaven-22179",
    storageBucket: "thrifthaven-22179.appspot.com",
    messagingSenderId: "402632877241",
    appId: "1:402632877241:web:b939a9596d1de60fe5e768",
    measurementId: "G-GP05WMQPCZ"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)