import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// add firebase config file here
 let firebaseConfig={
  // add your config file here 
 }
 
     
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();

export default auth;
export const firestore = firebase.firestore();
export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
