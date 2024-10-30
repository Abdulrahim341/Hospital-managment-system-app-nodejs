import globalError from "./middleware/globalError.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import patientRouter from "./modules/patient/patient.routes.js";
import docterRouter from "./modules/docter/docter.routes.js";
import appointmentRouter from "./modules/appointment/appointment.routes.js"

const bootstrab = (app, express) => {
  process.on("uncaughtExpectation", (err) => {
    console.log(err);
    console.log("err in code", err.details);
  });
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/patient", patientRouter);
  app.use("/docter", docterRouter);
  app.use("/appointment",appointmentRouter)

  app.use("*", (_, res) => {
    return res.json({ message: "not found" });
  });
  process.on("unhandledRejection", (err) => {
    console.log("error", err);
  });
  app.use(globalError);
};
export default bootstrab;
