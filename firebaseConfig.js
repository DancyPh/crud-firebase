// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { 
    apiKey : "AIzaSyAJKypnfwF_5vk_MxCLdQhz2dIr0U202SY" , 
    authDomain : "user-crud-cbd55.firebaseapp.com" , 
    projectId : "user-crud-cbd55" , 
    storageBucket : "user-crud-cbd55.appspot.com" , 
    messagingSenderId : "608212866906" , 
    appId : "1:608212866906:web:ab063628339101f8e2c563" , 
    measurementId : "G-7KM7J3HQLB" 
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };