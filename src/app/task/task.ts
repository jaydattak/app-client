import { User } from '../user/user'

export class Task {
    id : number;
    name: string;
    startDate : string;
    endDate : string;
    manager: User;
    setDate: boolean;
    priority : number;
    constructor()
    {
        this.manager = new User();
        this.priority = 0;
    }
}