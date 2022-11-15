/*
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage'; 
*/
import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBV58C4jXRoly73vzSV_ZofgUycqCDsEAo",
    authDomain: "outfit-forecast.firebaseapp.com",
    projectId: "outfit-forecast",
    storageBucket: "outfit-forecast.appspot.com",
    messagingSenderId: "7778456220",
    appId: "1:7778456220:web:1776026426a9bcdda85359",
    measurementId: "G-45F0GJK4J0"
  };

firebase.initializeApp(firebaseConfig);

export { firebase };