export class TaskModel {

    constructor() {}

    id: number;
    content: string;
    status: string;

    todo: boolean;
    doing: boolean;
    done: boolean;

    createdOn: string;
    updatedOn: string

    setStatus(state: string): void {
        this.todo = (parseInt(state) === 1);
        this.doing = (parseInt(state) === 2);
        this.done = (parseInt(state) === 3);
    }

}

export class QueryParams {
    /** task id */
    ids: string;
}
