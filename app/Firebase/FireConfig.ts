// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDrx1A7dIPf8SzB3QbXeVoCy5lXIh3ngo",
  authDomain: "chatgroup-c96a9.firebaseapp.com",
  projectId: "chatgroup-c96a9",
  storageBucket: "chatgroup-c96a9.appspot.com",
  messagingSenderId: "100806219505",
  appId: "1:100806219505:web:3b5eef6aa76025bef93b50"
};


// Initialize Firebase in NextJS 13
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }


