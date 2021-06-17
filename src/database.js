import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4AjKMUieuhAcw8feu5thqUtJ_vs3h1-k',
  authDomain: 'assetsmanagement-1bfef.firebaseapp.com',
  projectId: 'assetsmanagement-1bfef',
  storageBucket: 'assetsmanagement-1bfef.appspot.com',
  messagingSenderId: '751963152945',
  appId: '1:751963152945:web:0931aaa8eb45fed7f5eb10',
  measurementId: 'G-KGDPKZQE82',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();
let auth = firebase.auth();

export { db, storage, auth, firebase };
export default db;
