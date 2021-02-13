import firebase from "firebase";


const firebaseApp= firebase.initializeApp({
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyDcl9Nc67GoSh0SKf2nh1yhKLiJDSKbvVk",
    authDomain: "instagram-clone-react-4c306.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-4c306-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-4c306",
    storageBucket: "instagram-clone-react-4c306.appspot.com",
    messagingSenderId: "859598177804",
    appId: "1:859598177804:web:1b51ace993d1023ed59029",
    measurementId: "G-HFZTV5HR77"

});


const db = firebaseApp.firestore();
const auth= firebase.auth();
const storage=firebase.storage();

export { db,auth,storage};
//   export default firebaseConfig;