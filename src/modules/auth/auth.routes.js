import { Router } from "express";
import * as authcontroller from "./auth.controller.js";
import checkEmail from "../../middleware/checkEmail.js";
import userSchema from "../user/user.validation.js";
import validation from "../../middleware/validation.js";

const router = Router();
router
  .post("/signUp", validation(userSchema), checkEmail, authcontroller.signUp)
  .post("/signIn", authcontroller.signIn)
  .patch("/changePassword", authcontroller.changeUserPassword);

export default router;
