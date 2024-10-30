import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    spesialization: {
      type: String,
      enum: ["cardiology", "oncology", "neurology", "pediatrics", "surgery"],
      required: [true, "spesialization is required"],
    },
    userId: {
      type: Types.ObjectId,
      ref:'User',
    },
    fullName:String 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Patient = model("Patient", schema);
export default Patient;
