
import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCgTY7OB7DXypGe0G6pvF5PQbL2nqxsC38",
    authDomain: "assignment-d57c9.firebaseapp.com",
    databaseURL: "https://assignment-d57c9.firebaseio.com",
    projectId: "assignment-d57c9",
    storageBucket: "assignment-d57c9.appspot.com",
    messagingSenderId: "785990415022",
    appId: "1:785990415022:web:ce96a6ad5ea36d5853733f",
    measurementId: "G-R7EWYKEM9R"
}

export default firebase.initializeApp(config)
console.log("firebase initialized")
