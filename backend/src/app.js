import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import movie_Routes from "./routes/moviesRoutes.js";
import bookingRoutes from "./routes/bookingsRoute.js";
import DB_Connection from "./database/db_initialization.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({
    path:"./"
})
const app=express();
const port=process.env.PORT||8080;

// middle-wares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// User-middle-wares
app.use("/users",userRoutes);
app.use("/users/Signin",userRoutes);
app.use("/users/:id",userRoutes);
app.use("/users/Login",userRoutes);
app.use("/users/bookings/:id",userRoutes);

// Admin-middle-wares
app.use("/admins",adminRoutes);
app.use("/admins/Signin",adminRoutes);
app.use("/admins/:id",adminRoutes);
app.use("/admins/Login",userRoutes);
app.use("/admins/movies/:id",userRoutes);
// Movie-middle-wares
app.use("/movies",movie_Routes);
app.use("/movies/:id",movie_Routes);
// booking-middle-wares
app.use("/booking",bookingRoutes);
app.use("/booking/:id",bookingRoutes);
// database connection

DB_Connection();

app.listen(`${port}`,()=>{
    console.log(`Server is listening on : http://localhost:${port}`);
})








