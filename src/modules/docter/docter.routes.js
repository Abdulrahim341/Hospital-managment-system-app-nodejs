import { Router } from "express";
import * as docterController from "./docter.controller.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import {addDocterVal ,updateDocterVal} from "./docter.validation.js"
import { customValidation, upload } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";


const router = Router();
router.post(
  "/add",
  protectedRoutes,
  allowedTO("admin", "docter"),
  validation(addDocterVal),
  upload(customValidation.images, "docter").single("image"),
  docterController.addDocter
);
router.get('/',docterController.getDocters)
      .get('/:id',docterController.getDocter)
      .patch('/:id',protectedRoutes,
        allowedTO('admin','docter'),
        validation(updateDocterVal),
        upload(customValidation.images, "docter").single("image"),
        docterController.updateDocter
      )
      .delete('/:id',protectedRoutes,allowedTO('admin','docter'),docterController.deleteDocter)

export default router;
