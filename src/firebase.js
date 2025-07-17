import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA6Tsa9i07Otk5yZn5Xd2zOv0RlaAl0hCE",
    authDomain: "i-see-dreams.firebaseapp.com",
    projectId: "i-see-dreams",
    storageBucket: "i-see-dreams.firebasestorage.app",
    messagingSenderId: "564851561040",
    appId: "1:564851561040:web:559f63d9e5798e4d0db755",
    measurementId: "G-07ZFBR8KRD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
