import { User } from '../user/user'

export class Project {
	id : number;
	name: string;
	startDate : string;
	endDate : string;
	manager: User;
	setDate: boolean;
	priority : number;
	noOfTasks : number;
	noOfCompletedTasks : number;
	constructor()
	{
		this.manager = new User();
		this.priority = 0;
	}
}