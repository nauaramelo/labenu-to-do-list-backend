import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";


export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new IdGenerator()
    );

    public async createUser(req: Request, res: Response) {
        try {

            const result = await UserController.UserBusiness.createUser(
                req.body.name,
                req.body.nickname,
                req.body.email,
            )

            res.status(200).send({ message: 'Created User' })

        } catch (error) {
            res.status(error.errorCode || 400).send({ message: error.message });
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            
            const result = await UserController.UserBusiness.getUserById(req.params.id)

            res.status(200).send(result)
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async editUser(req: Request, res: Response) {
        try {

            const result = await UserController.UserBusiness.editUser(
                req.params.id,
                req.body.name,
                req.body.nickname,
                req.body.email
            )

            res.status(200).send({message: "Updated User"});

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        } 
    }
}