import { Router } from "express";
import { register } from "../controller/user.controller.js";
import checkInputs from "../lib/checkInputs.js";
import validation from "../middlewares/user.validation.js";

export const userRouter = Router();

userRouter.post("/register", checkInputs(), validation, register);
