import { initializeApp } from 'firebase/app';

const firebaseConfig = {

apiKey: "AIzaSyCYACxv9OsTqFn_7WbcPvIqoDBTVUdRAoA",
  authDomain: "project-four-62f2e.firebaseapp.com",
  databaseURL: "https://project-four-62f2e-default-rtdb.firebaseio.com",
  projectId: "project-four-62f2e",
  storageBucket: "project-four-62f2e.appspot.com",
  messagingSenderId: "1062522438289",
  appId: "1:1062522438289:web:6a43bc10757c85b0077530",
  measurementId: "G-ZTYVB3LVE0"

};


const firebase = initializeApp(firebaseConfig);

export default firebase;