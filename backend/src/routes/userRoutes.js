import express from "express";
import {getAlluser,Signin,deleteUser,updatedUser,Login,getallbookings,getuserById} from "../controllers/user_controller.js";

const userRoutes= express.Router();

userRoutes.get("/",getAlluser);
userRoutes.get("/:id",getuserById);
userRoutes.post("/Signin",Signin);
userRoutes.delete("/:id",deleteUser);
userRoutes.put("/:id",updatedUser);
userRoutes.post("/Login",Login);
userRoutes.get("/bookings/:id",getallbookings);
export default userRoutes;

