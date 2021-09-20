import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRdi6Sw8VHg2zBzJwQlsj1Oc0kWGyDF8Y",
  authDomain: "notebo-ok.firebaseapp.com",
  databaseURL: "https://notebo-ok.firebaseio.com",
  projectId: "notebo-ok",
  storageBucket: "notebo-ok.appspot.com",
  messagingSenderId: "932327958865",
  appId: "1:932327958865:web:c2f6a53903d8312a460b70",
  measurementId: "G-8R84H3KZRC",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
