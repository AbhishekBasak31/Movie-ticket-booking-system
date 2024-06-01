import express from "express";
import {newBooking,getBooking_by_id,delete_booking} from "../controllers/bookings_controller.js";

const bookingRoutes=express.Router();
bookingRoutes.post("/",newBooking);
bookingRoutes.get("/:id",getBooking_by_id);
bookingRoutes.delete("/:id",delete_booking);
export default bookingRoutes;