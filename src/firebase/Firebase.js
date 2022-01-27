import { initializeApp } from 'firebase/app';

const firebaseConfig = {

  apiKey: "AIzaSyARNLjjcGjo0etujUWdA5eIDyn2mC-Jk54",

  authDomain: "bite-size-traveling.firebaseapp.com",

  databaseURL: "https://bite-size-traveling-default-rtdb.firebaseio.com",

  projectId: "bite-size-traveling",

  storageBucket: "bite-size-traveling.appspot.com",

  messagingSenderId: "143467225919",

  appId: "1:143467225919:web:281fc6398136fb46b9298a"
};


const firebase = initializeApp(firebaseConfig);

export default firebase;