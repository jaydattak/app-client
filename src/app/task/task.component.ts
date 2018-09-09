import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from "./task.service";
import { Task } from './task';
import { User } from '../user/user';

import { DialogService } from "ng2-bootstrap-modal";
import { UserListComponent } from '../user/user-list/user-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers : [TaskService]
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
  
    constructor(private service: TaskService, private datePipe: DatePipe, private dialogService: DialogService, viewContainerRef: ViewContainerRef) {
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
          this.errorMessage =  this.getErrorMessage(res);
        }
      },
        error => {
          this.errorMessage = error;
        });
    }
  
    private loadAll() {
      this.tasks = this.service.getAll();
    }
  
    addTask() {
      this.resetMessages();
      if (this.buttonText == "Add") {
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
      this.resetMessages();
      this.task.id = task.id;
      this.task.name = task.name;
      this.task.startDate = this.datePipe.transform(task.startDate, "yyyy-MM-dd");
      this.task.endDate = this.datePipe.transform(task.endDate, "yyyy-MM-dd");
      this.task.priority = task.priority;
      this.task.setDate = task.setDate;
      this.task.manager = task.manager;
      this.setManagerName(this.task.manager);
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
        title: 'Users',
        entity: 'user'
      })
        .subscribe(result => {
          if (result && result.id) {
            //alert('accepted' + result.firstName);
            this.task.manager = result;
            this.setManagerName(result);
          }
          // else {
          // alert('declined');
          // }
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