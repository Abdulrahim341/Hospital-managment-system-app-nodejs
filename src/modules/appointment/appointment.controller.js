import { DateTime } from "luxon";
import Docter from "../../../model/doctor.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import Appointment from "../../../model/appointment.model.js";
import ApiFeatures from "../../utils/apiFeatures.js";



export const addAppointments=asyncHandler(async(req,res,next)=>{
   // check if patient is unique in all doctor appointments
  // check if patient is unique in doctor appointment array
    const patientPresent = await Docter.find();
  const newPatient = patientPresent.some((ele) => {
    return ele.appointments.some((ele2) => {
      return ele2.patientId == req.body.patientId;
    });
  });
  // setting dates date
  const fromDate = DateTime.fromISO(req.body.from);
  const toDate = DateTime.fromISO(req.body.to);
  const dateNow = DateTime.now();

  // if there is no conflict switch to add appointment
  if (!newPatient || newPatient.length === 0) {
    // check the from and to date
    if (fromDate <= dateNow || toDate <= dateNow || fromDate > toDate)
      return next(new AppError(`you can not reserve this date`, 409));
    // push appointment to doctor appointments
    await Docter.findByIdAndUpdate(req.body.docterId, {
      $push: { appointments: req.body },
    });

    // add appointment
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } else {
    return next(new AppError(`you already have an appointment`, 409));
  }
})

// update appointment
export const updateAppointment = asyncHandler(async (req, res, next) => {
    // get Doctor And Check if he found or not
    const docter = await Docter.findById(req.body.docterId);
    if (!docter) return next(new AppError("Doctor Not Found", 409));
  
    const fromDate = DateTime.fromISO(req.body.from);
    const toDate = DateTime.fromISO(req.body.to);
    const dateNow = DateTime.now();
  
    if (fromDate <= dateNow || toDate <= dateNow || fromDate > toDate)
      return next(new AppError("you can not reserve this date", 409));
  
    const checkAppointment = await Appointment.findOne({
      doctor: req.body.doctorId,
      _id: req.params.id,
      ...req.body,
    });
  
    if (checkAppointment) {
      return next(
        new AppError("Time already scheduled. Please choose another time", 409)
      );
    }
  
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return !appointment?
    next (new AppError("Appointment not found",409)):
    res.status(200).json({message:'success',status:200,appointment})
  });

  export const getAllAppointments=asyncHandler(async(req,res,next)=>{
    const dateNow=DateTime.now()
    const appointment=await Appointment.updateMany({to:{$lt:dateNow}},
        {$set:{
            from:null,
            to:null,
            status:'complited'
        }
    }
)
let ApiFeature =new ApiFeatures(Appointment.find(),req.query).pagination().sort().fields().search().filter()
const appointments=await ApiFeature.mongooseQuery
return appointments.length==0?
next (new AppError('appointments not found',404)):
res.status(200).json({message:"success",pageNumber:ApiFeatures.data,appointments,status:200})
})


export const getAppoitment=asyncHandler(async(req,res,next)=>{
    const appointment=await Appointment.findById(req.params.id).populate('patientId').populate('docterId')
    return !appointment?
    next (new AppError('appointment not found',404)):
    res.status(200).json({message:'success',appointment,status:200})
})


export const deleteAppointment=asyncHandler(async(req,res,next)=>{
    const appointment=await Appointment.findByIdAndDelete(req.params.id)
    return !appointment?
    next (new AppError('appointment not found',404)):
    res.status(200).json({message:'success',appointment,status:200})

})