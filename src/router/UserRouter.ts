import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/", new UserController().createUser);
userRouter.get("/:id", new UserController().getUserById);
userRouter.put("/:id", new UserController().editUser)