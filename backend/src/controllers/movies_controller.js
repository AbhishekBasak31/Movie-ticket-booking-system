import jwt from "jsonwebtoken";
import { MovieData } from "../models/movie.model.js";
import { Admin } from "../models/admin.model.js";
import mongoose from "mongoose";

// Add movie 
export const Add_movie=async(req, res, next) => {
    const existingtoken=req.headers.authorization.split(" ")[1];//Generally req.headers.authorization returns a string so will convert the
    // string in to an array by using split(" ") and then store  the index 1 value of the array by mentioning[1].
    console.log(typeof existingtoken);
    if(!existingtoken&&existingtoken.trim()===""){
        res.status(404).json({error: "No token found"});

    }
    console.log(existingtoken);

    // Verification

    let Admin_id;
    jwt.verify(existingtoken,process.env.SECRET_KEY_FOR_JWT_TOKEN,(err,decrypted)=>{
        if(err){
            res.status(422).json({error:err.message});
        }
        else{
            console.log(decrypted.id);
            Admin_id =decrypted.id;
            return;
        }

    });

    // Add movies
    const{moviename,cast,available_theaters,show_timing,description, featured,release_date,posterURL}=req.body;
    if(!moviename&&moviename.trim()===""&&!posterURL&&posterURL.trim()===""&&!description&&description.trim()===""){
        res.status(422).json({error:"please fill the required fields "});
    }
    let movie;
    try{
        movie= new MovieData({moviename,cast,available_theaters,show_timing,description,featured,release_date:new Date(`${release_date}`),posterURL,addedBy:Admin_id});
        const seasons= await mongoose.startSession();
        const admin=await Admin.findById(Admin_id);
        seasons.startTransaction();
        await movie.save({seasons});
        admin.added_movies.push(movie);
        await admin.save({seasons});
        seasons.commitTransaction();
    }
    catch(err){
        console.error({Failed_to_add_new_movie:err});
    }
    if(!movie){
        return res.status(500).json({ error: "failed to get the data of newly added movie" });
      }
    
      return res.status(200).json({message:"Movie added successfully",movie });


}

// get all movies
export const get_All_Movies =async(req,res,next)=>{
    let movies;
    try{
        movies=await MovieData.find();
    }
    catch(err){
        console.error({error:err});
    }
    if(!movies){
        res.status(500).json({error: "failed to get movies data"})
    }
    return res.status(200).json({movies})
}
// get movie by id
export const get_movie_by_id=async(req,res,next)=>{
    const id=req.params.id;
    if(!id&&id.trim()===""){
        return res.status(500).json({error:"movies id is missing"});
    }
    let movie;
    try{
        movie=await MovieData.findById(id);
    }
    catch(err){
        console.error({error:err});
    }
    if(!movie){
        return res.status(500).json({error: "failed to get specific movie data"});
    }
    return res.status(200).json({movie});
}
// delete movie
export const delete_movie=async(req,res,next)=>{
    const id= req.params.id;
    if(!id&&id.trim()===""){
        return res.status(500).json({error:"movies id is missing cant delete the movie"});
    }
    let movie;
    try{
        movie=await MovieData.findByIdAndDelete(id).populate("addedBy");
        const season= await mongoose.startSession();
        season.startTransaction();
        await movie.addedBy.added_movies.pull(movie);
        await movie.addedBy.save(season);
        season.commitTransaction();
    }
    catch(err){
        console.error({error:err});
    }
    if(!movie){
        return res.status(500).json({error: "failed to get specific movie data which tried to delete"});
    }
    return res.status(200).json({message:"Succesfully deleted"});
}