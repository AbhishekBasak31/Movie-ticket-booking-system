import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const DB_Connection=async()=>{ 
    try{
       const dbinitialization= await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
       console.log(`\nMongoDB has connected successfully:) DBhost:${dbinitialization.connection.host}`);
    }
    catch(err){
        console.error({MonogoDB_Connection_Failed:err});
        process.exit(1);
    }
}
export default DB_Connection;