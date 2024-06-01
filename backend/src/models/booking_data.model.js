import mongoose from "mongoose";

const SCHEMA=mongoose.Schema;
const booking_data=new SCHEMA({
    movie_id:{
        type:mongoose.Types.ObjectId,
        ref:"MovieData",
        required:[true,"movie name must be require"],
        

    },
    movie_name:{
        type:String,
        required:true
    },
    seatnumber:{
        type:Number,
        required:[true,"seat  number must be required"],
        minLength:1,
        maxLength:3
    },
    dateofbooking:{
        type:Date,
        required:[true,"dateofbooking must be required"],

    },
    bookingtime:{
        type:String,
        required:[true,"booking time must be required"],
       
    },
    bookedtheater:{
        type:String,
        required:[true,"bokked theater must be required"],
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true}
)

export const BookingData=mongoose.model("BookingData",booking_data);