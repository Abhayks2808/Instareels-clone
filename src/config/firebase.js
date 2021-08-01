import firebase from "firebase"
// put your firebase config file here


  // Initialize Firebase
let firebaseApp=firebase.initializeApp(firebaseconfig);
export let firebaseAuth=firebaseApp.auth();
export let firebasestoratege=firebaseApp.storage();
export let firebasedb=firebaseApp.firestore();