import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from "./task.service";
import { Task } from './task';
import { User } from '../user/user';
import { ParentTask } from '../task/parent-task-list/parent-task';

import { DialogService } from "ng2-bootstrap-modal";
import { UserListComponent } from '../user/user-list/user-list.component';
import { ParentTaskListComponent } from './parent-task-list/parent-task-list.component';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { ParentTaskService } from './parent-task-list/parent-task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService, ParentTaskService]
})

export class TaskComponent implements OnInit {
  tasks;
  successMessage: string;
  errorMessage: string;
  buttonText: string = "Add";
  searchText: string;
  task = new Task();
  managerName: string = "";
  private viewContainerRef: ViewContainerRef;

  constructor(private service: TaskService, private parentService: ParentTaskService, private datePipe: DatePipe, private dialogService: DialogService, viewContainerRef: ViewContainerRef) {
    this.tasks = service.getAll();
    this.buttonText = "Add";
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.resetDates();
  }

  deleteTask(id: number) {
    this.resetMessages();
    this.service.delete(id).subscribe((res: any) => {
      if (res.status) {
        this.resetTask();
        this.loadAll();
        this.successMessage = res.message;
      } else {
        this.errorMessage = this.getErrorMessage(res);
      }
    },
      error => {
        this.errorMessage = error;
      });
  }

  private loadAll() {
    this.tasks = this.service.getAll();
    console.log(this.tasks);
  }

  addParentTask(ptask: ParentTask){
    
    this.parentService.create(ptask).subscribe((res :any) => {
        if(res.status){
          this.resetTask();
          this.successMessage = res.message;
        } else{
          this.errorMessage = this.getErrorMessage(res);
        }
    }, error => {
      this.errorMessage = error;
    }
  }


  addTask() {
    this.resetMessages();
    if (this.buttonText == "Add") {
      if (this.task.isParentTask) { // In case of parent task is true
        let ptask = new ParentTask();
        ptask.name = this.task.name;
        this.addParentTask(ptask);
      } else {
        this.service.create(this.task).subscribe((res: any) => {
          if (res.status) {
            this.resetTask();
            this.loadAll();
            this.successMessage = res.message;
          } else {
            this.errorMessage = this.getErrorMessage(res);
          }
        }, error => {
          this.errorMessage = error;
        });
      }
    } else if (this.buttonText == "Update") {
      this.updateTask();
    }

  }

  updateTask() {
    this.resetMessages();
    this.service.update(this.task).subscribe((res: any) => {
      if (res.status) {
        this.resetTask();
        this.buttonText = "Add";
        this.loadAll();
        this.successMessage = res.message;
      } else {
        this.errorMessage = this.getErrorMessage(res);
      }

    }, error => {
      this.errorMessage = error;
    });
  }

  editTask(task: Task) {
    this.setValueToMainTask(task);
    this.buttonText = "Update";
  }

  resetTask() {
    this.task = new Task();
    this.managerName = "";
    this.buttonText = "Add";
    this.resetMessages();
    this.resetDates();
  }

  setValueToMainTask(task) {
    console.log(task);
    this.resetMessages();
    this.task.id = task.id;
    this.task.name = task.name;
    this.task.startDate = this.datePipe.transform(task.startDate, "yyyy-MM-dd");
    this.task.endDate = this.datePipe.transform(task.endDate, "yyyy-MM-dd");
    this.task.priority = task.priority;
    this.task.isParentTask = task.isParentTask;
    this.task.user = task.user;
    this.task.parentTask = task.parentTask ? task.parentTask : new ParentTask();
    this.task.project = task.project;
    this.setManagerName(this.task.user);
  }

  resetDates() {
    var date = new Date();

    var dateFormatTotime = new Date(date);
    var endDate = new Date(dateFormatTotime.getTime() + (1 * 86400000));

    this.task.startDate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.task.endDate = this.datePipe.transform(endDate, "yyyy-MM-dd");
  }

  transform(dateVal: string): Date {
    let dateArray = dateVal.split("-");
    console.log(dateVal);
    let dateObject = new Date(parseInt(dateArray[1]), parseInt(dateArray[2]) - 1, parseInt(dateArray[3]));
    return dateObject;
  }

  sortBySelection(str: string) {
    this.resetMessages()
    this.tasks = this.service.getAllBySort(str);
  }

  searchManagers() {
    let disposable = this.dialogService.addDialog(UserListComponent, {
      title: 'Users'
    })
      .subscribe(result => {
        if (result && result.id) {
          this.task.user = result;
          this.setManagerName(result);
        }
      });
  }

  searchParentTasks() {
    let disposable = this.dialogService.addDialog(ParentTaskListComponent, {
      title: 'Parent Task'
    })
      .subscribe(result => {
        if (result && result.id) {
          this.task.parentTask = result;
        }
      });
  }

  searchProjects() {
    let disposable = this.dialogService.addDialog(ProjectListComponent, {
      title: 'Project'
    })
      .subscribe(result => {
        if (result && result.id) {
          this.task.project = result;
        }
      });
  }

  searchTasks() {
    this.resetMessages();
    if (this.searchText == "") {
      this.loadAll();
    }
    else {
      this.tasks = this.service.getAllBySearch(this.searchText);
    }
  }

  setManagerName(user: User) {
    if (user) {
      this.managerName = user.employeeId + ' : ' + user.firstName + ' ' + user.lastName;
    } else {
      this.managerName = "";
    }
  }

  resetMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }

  getErrorMessage(res: any) {
    let mesg = res.message ? res.message : '';
    if (res.reason) {
      mesg += ' : ' + res.reason;
    }
    return mesg;
  }

}