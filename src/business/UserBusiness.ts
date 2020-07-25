import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { User } from "../model/User";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async createUser (name: string, nickname: string, email: string) {

        if (!name || !nickname || !email) {
            throw new Error('Missing input')
        }

        const id = this.idGenerator.generate();

        const user = new User(id, name, nickname, email)

        await this.userDatabase.createUser(user);
    }

    public async getUserById (id: string) {

        const user = await this.userDatabase.getUserById(id)

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user
    } 

    public async editUser (id: string, name: string, nickname: string, email: string) {

        if (!name && !nickname && !email) {
            throw new GenericError('Missing input')
        }

        const user = await this.userDatabase.getUserById(id)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        if (name) {
            user.setName(name) 
        }

        if (nickname) {
            user.setNickname(nickname)
        }

        if (email) {
            user.setEmail(email)
        }
        
        await this.userDatabase.editUser(user);

        return user
    }


}