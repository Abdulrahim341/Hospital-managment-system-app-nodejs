
import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    docterId: {
    type: Types.ObjectId,
    ref: 'Docter',
    },
    patientId: {
    type: Types.ObjectId,
    ref:'Patient',
    },
    from:Date,
    to:Date,
    status:String 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Appointment = model("Appointment", schema);
export default Appointment;
