import { BaseDataBase } from "./BaseDatabase";
import { Task } from "../model/Task";

export class TaskDatabase extends BaseDataBase {
    protected tableName: string = "TodoListTask"

    protected toModel(dbModel: any): Task {
        return (
            dbModel &&
            new Task(
                dbModel.id,
                dbModel.title,
                dbModel.description,
                dbModel.limit_date,
                dbModel.creator_user_id,
                dbModel.status
            )
        )
    }

    public async createTask(task: Task): Promise<void> {
        await this.getConnection()
        .insert({
            id: task.getId(),
            title: task.getTitle(),
            description: task.getDescription(),
            status: task.getStatus(),
            limit_date: task.getLimitDate(),
            creator_user_id: task.getCreatorUserId(),
        })
        .into(this.tableName)
    }


    public async getTaskById(id: string): Promise<Task> {
        const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
        .where("id", id);

        return this.toModel(result[0])
    }

}
