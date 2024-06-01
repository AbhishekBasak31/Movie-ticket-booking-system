import mongoose from "mongoose";
const SCHEMA=mongoose.Schema;
const adminSchema = new SCHEMA(
    {
        name:{
            type:String,
            required:[true,"admin name must be require"],
            unique:[true,"admin name should be unique"]
            
        },
        email:{
            type:String,
            required:[true,"admin email must be require"],
            unique:[true,"admin email should be unique"],
            lowercase:[true,"admin email should be in lowercase"]

        },
        password:{
            type:String,
            required:[true,"pasword must be require"],
            minLength:[6,"password must be at least 6 characters,got{VALUE}"]
            
        },
        added_movies:[{
            type:mongoose.Types.ObjectId,
            ref:"MovieData",
          
    }]
    },{timestamps:true}

);

export  const Admin=mongoose.model("Admin",adminSchema);