import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyBl7kVvni329tAfd2byEx85qAiZtlIF57w",
    authDomain: "react-slack-93343.firebaseapp.com",
    projectId: "react-slack-93343",
    storageBucket: "react-slack-93343.appspot.com",
    messagingSenderId: "373611358347",
    appId: "1:373611358347:web:c845d692fd29f9160a8c8e",
    measurementId: "G-RQ0LR3JJVM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
