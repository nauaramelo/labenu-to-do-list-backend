import { TaskDatabase } from "../data/TaskDatabase";
import { IdGenerator } from "../services/idGenerator";
import { Task } from "../model/Task";
import { TypeStatusTask } from "../enum/TypeStatusTask";
import { NotFoundError } from "../errors/NotFoundError";
import { TaskResultInterface } from "../interface/TaskResultInterface";
import moment from 'moment';

export class TaskBusiness {
    constructor(
        private taskDatabase: TaskDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async createTask (title: string, description: string, limitDate: Date, creatorUserId: string) {

        if (!title || !description || !limitDate) {
            throw new Error('Missing input')
        }

        const id = this.idGenerator.generate();

        const status = TypeStatusTask.TO_DO

        const task = new Task(id, title, description, limitDate, creatorUserId, status)

        await this.taskDatabase.createTask(task);
    }

    public async getTaskById(id: string) {

        const task = await this.taskDatabase.getTaskById(id)

        if (!task) {
            throw new NotFoundError('Task Not Found')
        }

        return this.toInterface(task);
    }

    private toInterface(task: Task): TaskResultInterface {
        return {
            id: task.getId(),
            creatorUserId: task.getCreatorUserId(),
            description: task.getDescription(),
            limitDate: moment(task.getLimitDate()).format('DD/MM/YYYY'),
            status: task.getStatus(),
            title: task.getTitle()
        }
    }
}