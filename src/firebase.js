import firebase from "firebase/app";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEGSVcIlvTKlMIAxSZh4--Vqu3Wkypuhc",
    authDomain: "designerkarigar-5b9d9.firebaseapp.com",
    projectId: "designerkarigar-5b9d9",
    storageBucket: "designerkarigar-5b9d9.appspot.com",
    messagingSenderId: "471885200474",
    appId: "1:471885200474:web:679b6609a0f0017f31ec63",
    measurementId: "G-JETNMX8F63"
};

firebase.initializeApp(firebaseConfig);

export default firebase;