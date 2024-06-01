import mongoose from "mongoose";

const SCHEMA=mongoose.Schema;

// const available_theaters_schema=new SCHEMA({
//     theaters_name:{
//         type:String,
//         required:true
//     },
//     time_phases:[{type:String,required:true}],

// })

const movie_data=new SCHEMA({
    moviename:{
        type:String,
        required:[true,"movie name must be require"],
        unique:[true,"movie name must be unique"],

    },
    cast:{
        type:[{type:String, required:true}]
        
      
     
    },
    available_theaters:{
        type:[{type:String, required:true}]
       
        

    },
    show_timing:{
        type:[{type:String, required:true}]
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    },
    release_date:{
        type:Date,
        required:true,
    },
    posterURL:{
        type:String,
        required:true,
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    bookings:[{type:mongoose.Types.ObjectId, ref:"BookingData"}]

},{timestamps:true}
)

export const MovieData=mongoose.model("MovieData",movie_data);