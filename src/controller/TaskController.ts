import { TaskDatabase } from "../data/TaskDatabase";
import { IdGenerator } from "../services/idGenerator";
import { Request, Response } from "express";
import { TaskBusiness } from '../business/TaskBusiness';
import moment from 'moment';

export class TaskController {
    private static TaskBusiness = new TaskBusiness(
        new TaskDatabase(),
        new IdGenerator()
    );

    public async createTask(req: Request, res: Response) {
        try {
            const result = await TaskController.TaskBusiness.createTask(
                req.body.title,
                req.body.description,
                moment(req.body.limitDate, "DD/MM/YYYY").toDate(),
                req.body.creatorUserId
            )

            res.status(200).send({message: "Created Task"})
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }


    public async getTaskById(req: Request, res: Response) {
        try {
            const result = await TaskController.TaskBusiness.getTaskById(req.params.id)

            res.status(200).send(result)
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
}