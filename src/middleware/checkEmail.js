import User from "../../model/user.model.js";
import AppError from "../utils/Error.js";
import asyncHandler from "./asyncHandler.js";



const checkEmail=asyncHandler(async(req,res,next)=>{
    const emailExist=await User.findOne({email:req.body.email})
    if(emailExist){
        return next (new AppError('email is already exist',401))
    }
    next()
})

export default checkEmail