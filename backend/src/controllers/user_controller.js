import { User } from "../models/user.model.js";
import {BookingData} from"../models/booking_data.model.js";
import bcrypt from "bcrypt";
const SaltRound= Number(process.env.SALT_ROUND);


// Get users
export const getAlluser = async (req, res, next) => {
  let user;
  try {
    user = await User.find();
  } catch (err) {
    console.error({Failed_to_read_user_data:err});
  }
  if (!user) {
    return res.status(500).json({ error: "failed to get user" });
  }

  return res.status(200).json({ user });
};

// Add user
export const Signin = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ error: "user has not provide any data " });
  }
  const existing_user_by_name=await User.findOne({name});
  const existing_user_by_email=await User.findOne({email});
  console.log( existing_user_by_name);
  console.log( existing_user_by_email);
  if(existing_user_by_name!=null&&Object.keys(existing_user_by_name).length>0){
        return res.status(422).json({message: "User by this user name is already  exists go for login"});
       
    }
  else if(existing_user_by_email!=null&&Object.keys(existing_user_by_email).length>0){
        return res.status(422).json({message: "User by this email id is already  exists go for login"});
    }
  else {
  let new_user;
  try{

    console.log(SaltRound);
   console.log(password);
   let hashed_pasword=bcrypt.hashSync(password, SaltRound);
   console.log(hashed_pasword);
   new_user= new User({ name, email,password:hashed_pasword });
    await new_user.save();
  }
  catch(err){
    console.error({Failed_to_write_user_data:err});

  }
  if(!new_user){
    return res.status(500).json({ error: "failed to get new users data" });
  }

  return res.status(200).json({ new_user });
}
};

// Delete user
export const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    if(!id&&id.trim()===""){
        return res.status(500).json({ error: "no user id found  " });
    }
    let user;
    try{
        user= await User.findByIdAndDelete(id)
    }
    catch(err){
        console.error({Failed_to_delete_the_partcular_entry:err});
    }
    if(!user){
        return res.status(500).json({error:"Failed to get the deleted user data"});
    }
    return res.status(200).json({message:"Deleted succesfully"});

};
// Update user
export const updatedUser=async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ error: "user has not provide any data " });
  }
  let user;
  try{
    let users_previous_data=await User.findById(id);
    console.log(`User_previous_password:${users_previous_data.password}`);
    console.log(`User_previous_name:${users_previous_data.name}`);
    console.log(`User_previous_email:${users_previous_data.email}`);
    console.log(`Updated_pasword:${password}`);
    console.log(`Updated_name:${name}`);
    console.log(`Updated_email:${email}`);
    console.log(SaltRound);
    let hashed_pasword=bcrypt.hashSync(password, SaltRound);
    user= await User.findByIdAndUpdate(id,{name,email,password:hashed_pasword});
  }
  catch(err){   
    console.error({Failed_to_update_the_user_data:err});

  }
  if(!user){
    return res.status(500).json({error:"Failed to get the updated user data"});
  }
  return res.status(200).json({message:"Updated successfully"});
}


// Login
export const Login=async(req, res,next)=>{
  const {email,password} = req.body;
  if(!email&&email.trim()===""&&!password&&password.trim()===""){
    res.status(422).json({error:"Invalid input please enter the correct input"});
  }
  
  let existing_user = await User.findOne({email});
  if(!existing_user){
    return res.status(422).json({error:"No user found please signin first"});
  }
  let result= bcrypt.compareSync(password,existing_user.password);
  if(!result){
    return res.status(422).json({message:"Password does not matched"});
  }
  return res.status(200).json({message:"Login Succesfully",existing_user});
}

// Get all booking of the user 
export const getallbookings=async (req, res,next) => {
  const id=req.params.id;
  if(!id&&id.trim()===""){
    return res.status(404).json({message:"user id not found so can't find the users bookings"});
  }
  let users_bookings;
  try{
    users_bookings= await BookingData.find({user_id:id});
  }
  catch(err){
    console.error({Failed_to_find_users_error:err});
  }
  if(!users_bookings){
    return res.status(404).json({message:"user's bookings not found"});
  }
  return res.status(200).json({users_bookings});
}
// get user by id
export const getuserById=async(req, res, next) => {

  const id= req.params.id;
  if(!id&&id.trim()===""){
    return res.status(404).json({message:"user id not found"});
  }
  let user;
  try{
    user=await User.findById(id);
  }
  catch(err){
    console.error({Failed_to_find_users:err});
  }
  if(!user){
    return res.status(404).json({message:"user detail not found"});
  }
  return res.status(200).json({message:"Succesfully get user details",user});
}