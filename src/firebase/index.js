import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsr-rbBYqMRB7gD29IV_Tik4_KNEkkJqk",
  authDomain: "recareercenter-exam.firebaseapp.com",
  projectId: "recareercenter-exam",
  storageBucket: "recareercenter-exam.appspot.com",
  messagingSenderId: "302752564422",
  appId: "1:302752564422:web:0478147717c84d8ecd83c7",
  measurementId: "G-18707DKYZM",
};

class FirebaseAuth {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
}

export default new FirebaseAuth();
