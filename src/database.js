import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7LATmCDgmOHSJv4bOpiriTJ5S8FXNKXI',
  authDomain: 'assetsmanagementfirebase.firebaseapp.com',
  databaseURL: 'https://assetsmanagementfirebase-default-rtdb.firebaseio.com',
  projectId: 'assetsmanagementfirebase',
  storageBucket: 'assetsmanagementfirebase.appspot.com',
  messagingSenderId: '426351489381',
  appId: '1:426351489381:web:c600c541e0570bd3b1318c',
  measurementId: 'G-XM724CN3LN',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();
let auth = firebase.auth();

export { db, storage, auth, firebase };
export default db;
