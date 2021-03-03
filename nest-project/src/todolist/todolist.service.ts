import { Injectable } from '@nestjs/common';
import { directus } from '../main';
import { TaskModel, QueryParams } from "../model/task.model";

@Injectable()
export class TodolistService {

    public readonly TODOLIST_COLLECTION: string = 'todolist';

    async directusRead(table): Promise<any> {
        return await directus.items(table).read();
    }

    async getAllTasks(): Promise<Array<TaskModel>>{
        let todolist: Array<TaskModel> = new Array<TaskModel>();
        await this.directusRead(this.TODOLIST_COLLECTION)
            .then( value => {
                value.data.forEach(item => {
                    todolist.push(this.buildTasks(item));
                }) })
            .catch( err => console.log('err gat all : ', err));
        return todolist;
    }

    async createTask(task: TaskModel): Promise<TaskModel> {
        const payload = this.creaTasktPayload(task);
        let createdTask = new TaskModel();
        await directus.items(this.TODOLIST_COLLECTION).create(payload)
            .then( value => {
                createdTask = this.buildTasks(value.data);
            })
            .catch( error => console.log('err create task',  error));
        return createdTask;
    }

    async editeTask(task: TaskModel, taskId: string): Promise<TaskModel> {
        const payload = this.creaTasktPayload(task);
        let updatedTask = new TaskModel()
        await directus.items(this.TODOLIST_COLLECTION).update(parseInt(taskId), payload)
            .then( value => {
                updatedTask = this.buildTasks(value.data);
            })
            .catch( error => console.log('err update task: ', error))
        return updatedTask;
    }

    deleteTask(taskId: string): string {
        directus.items('todolist').delete(parseInt(taskId))
            .catch(error => console.log('error: ', error))
        return `${parseInt(taskId)}`;
    }

    buildTasks(dataItem: any): TaskModel {
        let task: TaskModel = new TaskModel();
        task.id = dataItem.id;
        task.content = dataItem.task;
        task.setStatus(dataItem.status);

        task.createdOn = dataItem.date_created;
        task.updatedOn = dataItem.date_updated;
        task.userId = dataItem.id_user;
        task.boardId = dataItem.id_board;

        return task;
    }

    creaTasktPayload(task: TaskModel) {
        return {
            task: task.content,
            status: task.todo ? '1' : task.doing ? '2' : '3',
            id_user: task.userId,
            id_board: task.boardId
        };
    }

    public async findTodolistById(queryParams: QueryParams): Promise<Array<TaskModel>> {
        let taskModelTab: Array<TaskModel> = new Array<TaskModel>();
        let idsTab: Array<number> = []

        queryParams.ids.split(',').forEach( id => {
            idsTab.push(parseInt(id));
        })

        const query = { filter: { id: { _in: idsTab }   } };
        await directus.items(this.TODOLIST_COLLECTION).read(query)
            .then( response => {
                response.data.forEach(task => {
                    taskModelTab.push(this.buildTasks(task));
                });
            })
           .catch( error => console.log('error: ', error));
        return taskModelTab;
    }
}