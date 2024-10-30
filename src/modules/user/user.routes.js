import { Router } from "express";
import * as userController from "./user.controller.js";
import userSchema from "./user.validation.js";
import checkEmail from "../../middleware/checkEmail.js";
import validation from "../../middleware/validation.js";

const router = Router();
router.post(
  "/create",
  validation(userSchema),
  checkEmail,
  userController.adduser
);
router.get('/:id',userController.getuser)
router.get('/',userController.getusers)
router.patch('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)


export default router