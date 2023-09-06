import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB404TC6PtCj8Jjo-yB6VyKnjPJqz-lcZA",
  authDomain: "uploadimage-db7c0.firebaseapp.com",
  projectId: "uploadimage-db7c0",
  storageBucket: "uploadimage-db7c0.appspot.com",
  messagingSenderId: "790163864083",
  appId: "1:790163864083:web:8222cf83aacaf70fa25de6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);