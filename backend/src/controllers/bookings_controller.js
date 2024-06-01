import mongoose from "mongoose";
import {BookingData} from "../models/booking_data.model.js";
import {User} from "../models/user.model.js";
import{MovieData} from"../models/movie.model.js";
//New Booking
export const newBooking=async(req, res, next) => {
  
    const{movie_id,movie_name, seatnumber,dateofbooking,bookingtime,user_id,bookedtheater}=req.body;
    if(!movie_name&&movie_name.trim()===""&&!movie_id&&movie_id.trim()===""&&!bookingtime&&bookingtime.trim()===""&&!bookedtheater&&bookedtheater.trim()===""){
        return res.status(400).json({message:"user does not provided the required data"});
    }
    let existance_user=await User.findById(user_id);
    let existance_movie=await MovieData.findById(movie_id);
    if(!existance_user){
        return res.status(404).json({message:"No User found by the given user id "});
    }
    if(!existance_movie){
        return res.status(404).json({message:"No movies found by given movie id"})
    }
    let booking;
    try{
        booking= new BookingData({ movie_id,movie_name,seatnumber,dateofbooking:new Date(`${dateofbooking}`),bookingtime,bookedtheater,user_id}) ;
        const seasons = await mongoose.startSession();
        seasons.startTransaction();
        existance_user.booked_movies.push(booking);
        existance_movie.bookings.push(booking);
        await existance_user.save({seasons});
        await existance_movie.save({seasons});
        await booking.save({seasons});
        seasons.commitTransaction();
    }
    catch(err){
        console.error(err);
    }
    if(!booking){
        return res.status(500).json({error:"Failed to get booking details"});
    }
    return res.status(200).json({booking});

}


// Get Booking by id
export const getBooking_by_id=async(req, res, next) => {
    const id=req.params.id;
    if(!id&&id.trim()===""){
        return res.status(404).json({error:"booking id not found"});
    }
    let booking ;
    try{
        booking=await BookingData.findById(id);
    }
    catch(err){
        console.error({Failed_to_find_booking_by_id:err});
    }
    if(!booking){
        return res.status(500).json({error:"Failed to get the specific booking data "});
    }
    return res.status(200).json({booking});
}


// Delete a booking
export const delete_booking=async(req, res, next) => {
    const id= req.params.id;
    if(!id&&id>trim()===""){
        return res.status(404).json({error:"Id of the booking which you try to delete is not found"});
    }
    let booking;
    try{
        booking=await BookingData.findByIdAndDelete(id).populate("movie_id  user_id");
        const seasons= await mongoose.startSession();
        seasons.startTransaction();
        await booking.movie_id.bookings.pull(booking);
        await booking.user_id.booked_movies.pull(booking);
       await booking.movie_id.save(seasons);
       await booking.user_id.save(seasons);
       seasons.commitTransaction();
    }
    catch(err){
        console.error({Failed_to_delete_the_booking:err});
    }
    if(!booking){
        return res.status(500).json({error:"Failed to fetch the deleted booking data"});
    }
    return res.status(200).json({message:"Succesfully deleted"});
}