import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

import bcrypt from "bcrypt";
import { MovieData } from "../models/movie.model.js";
const SaltRound= Number(process.env.SALT_ROUND);

// Get all admin
export const get_All_admin=async(req, res,next) => {
    let admins;
    try{
        admins =await Admin.find();
    }
    catch(err){
        console.error({Failed_to_get_admin_data:err});
    }
    if(!admins){
      return  res.status(500).json({error:"Failed to get all admins data"});
    }
    return res.status(200).json({message:"Admin data fetched succesfully",admins});

}
export const get_added_movies_by_admin= async(req, res, next) => {
  const id=req.params.id;
  if(!id&&id.trim()===""){
    return res.status(404).json({message:"admin id not found so can't find the added movies details"});
  }
  let added_movies;
  try{
    added_movies=await MovieData.find({addedBy:id});
  }
  catch(err){
    console.error({Failed_to_get_added_movies_details:err});
  }
  if(!added_movies){
    return res.status(404).json({error:"Movie details not found"})
  }
  return res.status(200).json({message:"Succesfully get the added movies  detail",added_movies});
}
// Signin
export const Sign_in_Admin =async(req, res, next) => {
    const{name,email,password} = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ error: "admin has not provided any data " });
      }
      const existing_admin_by_name=await Admin.findOne({name});
      const existing_admin_by_email=await Admin.findOne({email});
      console.log( existing_admin_by_name);
      console.log( existing_admin_by_email);
      if(existing_admin_by_name!=null&&Object.keys(existing_admin_by_name).length>0){
        return res.status(422).json({message: "admin by this admin name is already  exists go for login"});
       
      }
      else if(existing_admin_by_email!=null&&Object.keys(existing_admin_by_email).length>0){
        return res.status(422).json({message: "admin by this email id is already  exists go for login"});
      }
      else {
      let admin;
      try{
        console.log(SaltRound);
        console.log(password);
        console.log(name);
        console.log(email);
        let hashed_pasword=bcrypt.hashSync(password, SaltRound);
        console.log(hashed_pasword);
        admin= new Admin({ name, email,password:hashed_pasword });
        await admin.save();
      }
      catch(err){
        console.error({Failed_to_write_admin_data:err});
      }
      if(!admin){
       return res.status(500).json({error:"Failed to get the new admin data"});
      }
      return res.status(200).json({message:"New Admin data inserted",admin});
    }
}
// Update
export const Update_Admin =async(req, res, next) => {
    const id=req.params.id;
    if(!id&&id.trim()){
      return res.status(500).json({err:"Failed to fetch admin id"});
    }
    console.log(id);
    const{name,email,password} = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ error: "admin has not provide any data for upgradation" });
      }
      let admin;
      try{
        let admin_previous_data=await Admin.findById(id);
        console.log(`Admin_previous_password:${admin_previous_data.password}`);
        console.log(`Admin_previous_name:${admin_previous_data.name}`);
        console.log(`Admin_previous_email:${admin_previous_data.email}`);
        console.log(`Admin_Updated_pasword:${password}`);
        console.log(`Admin_Updated_name:${name}`);
        console.log(`Admin_Updated_email:${email}`);
        console.log(SaltRound);
        let hashed_pasword=bcrypt.hashSync(password, SaltRound);
        console.log(hashed_pasword);
        admin= await Admin.findByIdAndUpdate(id,{ name, email,password:hashed_pasword });
      }
      catch(err){
      
        console.error({Failed_to_update_the_admin_data:err});
      }
      if(!admin){
        return res.status(500).json({error:"Failed to get the updated admin data"});
      }
      return res.status(200).json({message:"Updated successfully"});
}
// Delete
export const delete_Admin =async (req, res,next) => {
  const id = req.params.id;
  if(!id&&id.trim()){
    return res.status(500).json({err:"Failed to fetch admin id"});
  }
  let admin;
  try{
    admin=await Admin.findByIdAndDelete(id);

  }
  catch(err){
    console.error({Failed_to_delete_admin_data:err});

  }
  if(!admin){
    return res.status(500).json({err:"Failed to get deleted admin data"});
  }
  return res.status(200).json({message:"Successfully deleted"});
}
// Login
export const Login_Admin=async(req, res, next) => {
  const {email,password} = req.body;
  if(!email&&email.trim()===""&&!password&&password.trim()===""){
    res.status(422).json({error:"Invalid input please enter the correct input"});
  }
  let existing_admin;
  try{
    existing_admin=await Admin.findOne({email});
  }
  catch(err){
    console.error({Failed_to_find_admin_data:err});
  }
  
  if(!existing_admin){
    return res.status(404).json({error:"No admin found please signin first"});
  }
  let result=bcrypt.compareSync(password, existing_admin.password);
  if(!result){
    res.status(422).json({error:"Password does not match please enter a valid passsword"});
  }
  const token=jwt.sign({id:existing_admin._id},process.env.SECRET_KEY_FOR_JWT_TOKEN,{expiresIn:"1d"});
  console.log(existing_admin._id)
  res.status(200).json({message:"Login successful",token,id:existing_admin._id});

}

// get admin by id
export const get_Admin_by_id=async(req, res,next) => {
  const id=req.params.id;
  let admin;
  try{
      admin =await Admin.findById(id);
  }
  catch(err){
      console.error({Failed_to_get_admin_data:err});
  }
  if(!admin){
    return  res.status(500).json({error:"Failed to get specific admins data"});
  }
  return res.status(200).json({message:"Admin data fetched succesfully",admin});

}