import { model, Schema } from "mongoose";
import bcrybt from "bcrypt";

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    mobileNumber: {
      type: String,
      unique: [true, "mobileNumber must be unique"],
      required: [true, "mobileNumber is required"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "gender is required"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    confirmEmail: {
      type: String,
      default: false,
    },
    OTP: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "docter", "patient"],
      required: [true, "role is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.pre("save", function () {
  this.password = bcrybt.hashSync(this.password, 8);
});

const User = model("User", schema);
export default User;
