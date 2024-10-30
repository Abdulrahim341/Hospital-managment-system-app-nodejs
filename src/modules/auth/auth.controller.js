import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrybt from "bcrypt";
import "dotenv/config"
import AppError from "../../utils/Error.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY); //process.env.JWT_KEY
  return res.json({ message: "success", token });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrybt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrybt.compareSync(req.body.password, user.password)) {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newpassword, passwordchangedAt: Date.now() }
    );
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
    return res.json({ message: "password changed successfuly", token });
  }
  next(new AppError("incorrect email or password", 401));
});

export const protectedRoutes = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("token not provided", 401));
  jwt.verify(token, 'booda', (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.passwordchangedAt) {
    let time = parseInt(user.passwordchangedAt.getTime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("invalid token...logIn again", 401));
  }
  req.user = user;
  next();
});

export const allowedTO = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(
      new AppError("you not authorized to access this endpoint", 401)
    );
  });
};
