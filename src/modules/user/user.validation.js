import joi from "joi";

const userSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  mobileNumber: joi.string().required(),
  email: joi.string().required(),
  gender: joi.string().valid("male", "female").required(),
  age: joi.number().required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
  role: joi.string().valid("docter", "admin", "patient"),
  OTP: joi.number(),
});

export default userSchema;
