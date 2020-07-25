import { TypeStatusTask } from "../enum/TypeStatusTask";

export class Task {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private limitDate: Date,
        private creatorUserId: string,
        private status: TypeStatusTask
    ) {}

    public getId(): string {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public getDescription(): string {
        return this.description
    }

    public getLimitDate(): Date {
        return this.limitDate
    }

    public getCreatorUserId(): string {
        return this.creatorUserId
    }

    public getStatus(): TypeStatusTask {
        return this.status
    }
}