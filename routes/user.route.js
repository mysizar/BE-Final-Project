import { Router } from "express";
import { login, logout, register } from "../controller/user.controller.js";
import checkInputs from "../lib/checkInputs.js";
import validation from "../middlewares/user.validation.js";
import verifyUser from "../middlewares/user.verification.js";

export const userRouter = Router();

userRouter.post("/register", checkInputs(), validation, register);
userRouter.post("/login", checkInputs(), verifyUser, login);
userRouter.post("/logout", logout);
