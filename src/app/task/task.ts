import { User } from '../user/user'
import { ParentTask } from './parent-task-list/parent-task';
import { Project } from '../project/project';

export class Task {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    user: User = new User();
    isParentTask: boolean = false;
    parentTask: ParentTask = new ParentTask();
    project: Project = new Project();
    priority: number = 0;
    status: string;
    constructor() {
    }
}