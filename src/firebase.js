import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0GISo0FygaJ0MDPrG6wNBjGs-QctUeCc",
  authDomain: "auth-dev-8d31d.firebaseapp.com",
  projectId: "auth-dev-8d31d",
  storageBucket: "auth-dev-8d31d.appspot.com",
  messagingSenderId: "599587331369",
  appId: "1:599587331369:web:433dddc39530040705ab38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app)


export const schema = {
  folders: collection(db, "folders"),
  files: collection(db, "files"),
  formatDoc: (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  },
};

export default app;
