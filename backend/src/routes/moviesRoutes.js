import express from "express";
import{Add_movie,get_All_Movies, get_movie_by_id,delete_movie}from "../controllers/movies_controller.js"
const movie_Routes=express.Router();
movie_Routes.post("/",Add_movie);
movie_Routes.get("/",get_All_Movies);
movie_Routes.get("/:id",get_movie_by_id);
movie_Routes.delete("/:id",delete_movie);
export default movie_Routes;