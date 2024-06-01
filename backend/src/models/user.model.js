import mongoose from "mongoose";

const SCHEMA=mongoose.Schema;
const userSchema=new SCHEMA({
    name:{
        type:String,
        required:[true,"user name must be require"],
        unique:[true,"user name should be unique"],
       
    },
    email:{
        type:String,
        required:[true,"user email must be require"],
        unique:[true,"user email should be unique"],
        lowercase:[true,"user email should be in lowercase"],
    },
    password:{
        type:String,
        required:[true,"password must be require"],
        minLength:[6,'password must be at least 6 characters,got{VALUE}'],
        
    },
    booked_movies:[
        {
            type:mongoose.Types.ObjectId,
            ref:"BookingData"
        }
    ]
},{timestamps:true}

);
export  const User = mongoose.model("User", userSchema);