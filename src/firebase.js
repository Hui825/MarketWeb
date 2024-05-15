import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {

  databaseURL: "https://python-db-practice-96823-default-rtdb.firebaseio.com/",

};



const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


export default firebaseConfig;


