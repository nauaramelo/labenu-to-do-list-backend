import express from "express";
import { TaskController } from "../controller/TaskController";

export const taskRouter = express.Router();

taskRouter.post("/", new TaskController().createTask);
taskRouter.get("/:id", new TaskController().getTaskById)