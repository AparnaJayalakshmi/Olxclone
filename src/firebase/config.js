import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOmdknBdq_sCU60tvY45kh0Wd0StHhprc",
    authDomain: "olxclone-cc0e2.firebaseapp.com",
    projectId: "olxclone-cc0e2",
    storageBucket: "olxclone-cc0e2.appspot.com",
    messagingSenderId: "194581709899",
    appId: "1:194581709899:web:e91648b5c76d4072ee79ce",
    measurementId: "G-HT667G05R0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


