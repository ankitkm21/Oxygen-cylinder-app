import * as firebase from 'firebase';
import '@firebase/firestore';
  var firebaseConfig = {
    apiKey: "AIzaSyCuRbw-29N7tm2lZccroDatrWuLW4vQe_w",
    authDomain: "protect-life-1ef22.firebaseapp.com",
    projectId: "protect-life-1ef22",
    storageBucket: "protect-life-1ef22.appspot.com",
    messagingSenderId: "692401633311",
    appId: "1:692401633311:web:530a8e0aaa91bea6ae3d2a"
  };
// Initialize Firebase
if(!firebase.apps.length){ 
  firebase.initializeApp(firebaseConfig); 
  } 
  export default firebase.firestore()