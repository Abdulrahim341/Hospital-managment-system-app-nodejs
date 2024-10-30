import { DateTime } from "luxon";
import Docter from "../../../model/doctor.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import fs from "fs"
import path from "path"
import User from "../../../model/user.model.js";


export const addDocter=asyncHandler(async(req,res,next)=>{
    const spesialization=await Docter.findOne({userId:req.body.userId})
    if(spesialization){
        const docter=await Docter.findOne({userId:req.body.userId})
        if(docter) next (new AppError('docter already exist'),404)
    }else{
        const user = await User.findById(req.body.userId);
        req.body.image=req.file.filename
        req.body.fullName=`${user.firstName}${user.lastName}`
        const docter=new Docter(req.body)
        await docter.save()
        return res.status(200).json({message:'success',docter,status:200})
}
})


export const getDocters=asyncHandler(async(req,res,next)=>{
    const dateNow= DateTime.now()
    let dateNowAfterConver= dateNow.toISO({
        includeOffset: false,
        suppressMilliseconds: true,
        includeSeconds: true,
    })
    await Docter.updateMany(
        {},{
            $pull:{
                appointments:{
                    to:{$lt:dateNowAfterConver}
                }
            }
        }
    )
    let ApiFeature =new ApiFeatures(Docter.find(),req.query).pagination().sort().fields().search().filter()
    const docters=await ApiFeature.mongooseQuery.populate('userId')
    return docters.length==0?
    next (new AppError('docters not found',404)):
    res.status(200).json({message:'success',pageNumber:ApiFeatures.data,docters,status:200})
})

export const getDocter=asyncHandler(async(req,res,next)=>{
    const docter=await Docter.findById(req.params.id).populate('userId')
    return !docter?
    next (new AppError('docter not found'),404):
    res.status(200).json({message:'success',docter,status:200})
})


export const updateDocter=asyncHandler(async(req,res,next)=>{
     // catching old image
  const oldDocter = await Docter.findById(req.params.id);
  const file = oldDocter.image.split("/");
  const oldImage = file[file.length-1];
  const destinationPath = path.resolve(`uploads/docter/${oldImage}`);
  // deleting oldPhoto
if (fs.existsSync(destinationPath)) {
    fs.unlinkSync(destinationPath);
}
const docter=await Docter.findByIdAndUpdate(req.params.id,req.body,{new:true})
return !docter?
next(new AppError('docter not found',404)):
res.status(200).json({message:'success',docter,status:200})
})


export const deleteDocter=asyncHandler(async(req,res,next)=>{
  // catching old image
  const oldDocter = await Docter.findById(req.params.id);
  const file = oldDocter.image.split("/");
  const oldImage = file[file.length-1];
  const destinationPath = path.resolve(`uploads/docter/${oldImage}`);
  // deleting oldPhoto
if (fs.existsSync(destinationPath)) {
    fs.unlinkSync(destinationPath);
}
const docter=await Docter.findByIdAndDelete(req.params.id,{new:true})
return !docter?
next(new AppError('docter not found',404)):
res.status(200).json({message:'success',docter,status:200})
})

