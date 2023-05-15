// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCMQWLFydUrrxmIhXfTALFiZt60QakiQ2k",
    authDomain: "chat-7d724.firebaseapp.com",
    projectId: "chat-7d724",
    storageBucket: "chat-7d724.appspot.com",
    messagingSenderId: "767812816843",
    appId: "1:767812816843:web:8bf3648571899c69d1b04e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();