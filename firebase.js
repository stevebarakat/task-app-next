import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr0A0MwlowyBpyqKiuG_qw-eAxZ-rjK3A",
  authDomain: "task-app-next.firebaseapp.com",
  projectId: "task-app-next",
  storageBucket: "task-app-next.appspot.com",
  messagingSenderId: "1030326204278",
  appId: "1:1030326204278:web:853abbbb02745a0d5d2c57"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();