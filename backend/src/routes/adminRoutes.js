import express from "express";
import{get_All_admin,Sign_in_Admin,Update_Admin,delete_Admin,Login_Admin,get_Admin_by_id,get_added_movies_by_admin}from"../controllers/admin_controller.js";

const adminRoutes= express.Router();
adminRoutes.get("/",get_All_admin);
adminRoutes.get("/:id",get_Admin_by_id);
adminRoutes.post("/Signin",Sign_in_Admin);
adminRoutes.put("/:id",Update_Admin);
adminRoutes.delete("/:id",delete_Admin);
adminRoutes.post("/Login",Login_Admin);
adminRoutes.get("/movies/:id",get_added_movies_by_admin)

export default adminRoutes;