import { Router } from "express";
import * as appointmentController from "./appointment.controller.js"
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.post("/add",protectedRoutes,allowedTO('admin','patient') ,appointmentController.addAppointments)
    .patch("/:id",protectedRoutes,allowedTO('admin','patient'),appointmentController.updateAppointment)
    .get("/",protectedRoutes,allowedTO('admin'),appointmentController.getAllAppointments)
    .get("/:id",protectedRoutes,allowedTO('admin','patient'),appointmentController.getAppoitment)
    .delete("/:id",protectedRoutes,allowedTO('admin','patient'),appointmentController.deleteAppointment)

export default router

//