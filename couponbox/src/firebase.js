import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { exp } from 'react-native-reanimated';

const firebaseConfig= {
  apiKey: "AIzaSyBUyzSomwRy8atRgJHDuJT01Uh4GjqqsT0",
    authDomain: "couponbox-b7a3d.firebaseapp.com",
    databaseURL: "https://couponbox-b7a3d.firebaseio.com",
    projectId: "couponbox-b7a3d",
    storageBucket: "couponbox-b7a3d.appspot.com",
    messagingSenderId: "954319225728",
    appId: "1:954319225728:web:2bdbfa25c2cce922d97765",
    measurementId: "G-8HB712KE3S"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firestore, auth, storage };