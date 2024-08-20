// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtny8BZLxTw7QMm7xqwdDrgJav1SfXH8E",
  authDomain: "schedulingapp-a25b5.firebaseapp.com",
  projectId: "schedulingapp-a25b5",
  storageBucket: "schedulingapp-a25b5.appspot.com",
  messagingSenderId: "152584929896",
  appId: "1:152584929896:web:ed07cf4315265310a331dd",
  measurementId: "G-RCP89W9GRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var email = document.getElementById("email");
var password = document.getElementById("password");
var signInButton = document.getElementById("signInButton");
var signUpButton = document.getElementById("signUpButton");

// Add event listeners to the sign in and sign up buttons
signInButton.addEventListener("click", function() {
  // Sign in the user using Firebase's signInWithEmailAndPassword method
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function() {
      // Redirect the user to the protected resources page
      window.location.href = "/protected-resources.html";
    })
    .catch(function(error) {
      // Show an error message
      alert(error.message);
    });
});

signUpButton.addEventListener("click", function() {
  // Sign up the user using Firebase's createUserWithEmailAndPassword method
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function() {
      // Redirect the user to the protected resources page
      window.location.href = "/protected-resources.html";
    })
    .catch(function(error) {
      // Show an error message
      alert(error.message);
    });
});