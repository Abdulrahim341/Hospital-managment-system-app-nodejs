import { Router } from "express";
import * as patientcontroller from "./patient.controller.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
// import checkEmail from "../../middleware/checkEmail.js";
// import userSchema from "../user/user.validation.js";
// import validation from "../../middleware/validation.js";

const router = Router();
router
  .post("/add",protectedRoutes,allowedTO('patient','admin'), patientcontroller.addPatient)
  .get("/", patientcontroller.getAllPatients)
  .get("/:id", patientcontroller.getPatientById)
  .patch("/:id", patientcontroller.updatePatient)
  .delete("/:id", patientcontroller.deletePatient)



export default router;

