import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";
import { serialize } from "v8";


export class UserDatabase extends BaseDataBase {
    protected tableName: string = "ToDoListUser"

    protected toModel(dbModel: any): User {
        return (
            dbModel &&
            new User(
                dbModel.id,
                dbModel.name,
                dbModel.nickname,
                dbModel.email
            )
        )
    }

    public async createUser(user: User): Promise<void> {
        await super.getConnection().raw(`
            INSERT INTO ${this.tableName} (id, name, nickname, email)
            VALUES (
                '${user.getId()}',
                '${user.getName()}',
                '${user.getNickname()}',
                '${user.getEmail()}'
            )
        `)
    }

    public async getUserById(id: string): Promise<User> {
        const result = await super.getConnection()
        .select("id","nickname")
        .from(this.tableName)
        .where('id', id).first();

        return this.toModel(result);
    }

    public async editUser(user: User): Promise<void> {
        await super.getConnection()
        .update({
            nickname: user.getNickname(),
            email: user.getEmail(),
            name: user.getName()
        })
        .from(this.tableName)
        .where('id', user.getId());
    }
}
