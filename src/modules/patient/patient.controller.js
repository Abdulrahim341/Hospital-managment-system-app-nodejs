import Patient from "../../../model/patient.model.js";
import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";


export const addPatient=asyncHandler(async(req,res,next)=>{
  const user= await User.findById(req.body.userId)
  req.body.fullName=`${user.firstName}${user.lastName}`
  const patient=await Patient.findOne({userId:req.body.userId})
  if(patient) next (new AppError('patient already exist',500))
    else{
        const patient=new Patient(req.body)
        await patient.save()
        // const patient=await Patient.create(req.body)

  return res.status(200).json({message:"success",patient,status:200})
}
})


export const getAllPatients=asyncHandler(async(req,res,next)=>{
    const patients=await Patient.find().populate('userId')
    return !patients?
    next (new AppError('patients not found',404)):
    res.status(200).json({message:'success',patients,status:200})
})


export const getPatientById=asyncHandler(async(req,res,next)=>{
    const patient=await Patient.findById(req.params.id).populate('userId')
    return !patient?
    next (new AppError('patient not found',404)):
    res.status(200).json({message:'success',patient,status:200})
})

export const updatePatient=asyncHandler(async(req,res,next)=>{
    const patient =await Patient.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !patient?
    next (new AppError('patient not found',404)):
    res.status(200).json({message:'success',patient,status:200})
})

export const deletePatient=asyncHandler(async(req,res,next)=>{
    const patient =await Patient.findByIdAndDelete(req.params.id,{new:true})
    return !patient?
    next (new AppError('patient not found',404)):
    res.status(200).json({message:'success',patient,status:200})
})