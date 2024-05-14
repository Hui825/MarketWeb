import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {

  databaseURL: "https://test01-24j6o-default-rtdb.firebaseio.com/",

};



const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


export default firebaseConfig;


