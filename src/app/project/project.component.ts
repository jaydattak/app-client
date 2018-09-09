import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectService } from "./project.service";
import { Project } from './project';
import { User } from '../user/user';

import { DialogService } from "ng2-bootstrap-modal";
import { UserListComponent } from '../user/user-list/user-list.component';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, DatePipe]
})
export class ProjectComponent implements OnInit {
  projects;
  successMessage: string;
  errorMessage: string;
  buttonText: string = "Add";
  searchText: string;
  project = new Project();
  managerName: string = "";
  private viewContainerRef: ViewContainerRef;

  constructor(private service: ProjectService, private datePipe: DatePipe, private dialogService: DialogService, viewContainerRef: ViewContainerRef) {
    this.projects = service.getAll();
    this.buttonText = "Add";
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.resetDates();
  }

  deleteProject(id: number) {
    this.resetMessages();
    this.service.delete(id).subscribe((res: any) => {
      if (res.status) {
        this.resetProject();
        this.loadAllUsers();
        this.successMessage = res.message;
      } else {
        this.errorMessage =  this.getErrorMessage(res);
      }
    },
      error => {
        this.errorMessage = error;
      });
  }

  private loadAllUsers() {
    this.projects = this.service.getAll();
  }

  addProject() {
    this.resetMessages();
    if (this.buttonText == "Add") {
      this.service.create(this.project).subscribe((res: any) => {
        if (res.status) {
          this.resetProject();
          this.loadAllUsers();
          this.successMessage = res.message;
        } else {
          this.errorMessage = this.getErrorMessage(res);
        }
      }, error => {
        this.errorMessage = error;
      });
    } else if (this.buttonText == "Update") {
      this.updateProject();
    }
  }

  updateProject() {
    this.resetMessages();
    this.service.update(this.project).subscribe((res: any) => {
      if (res.status) {
        this.resetProject();
        this.buttonText = "Add";
        this.loadAllUsers();
        this.successMessage = res.message;
      } else {
        this.errorMessage = this.getErrorMessage(res);
      }

    }, error => {
      this.errorMessage = error;
    });
  }

  editProject(project: Project) {
    this.setValueToMainProject(project);
    this.buttonText = "Update";
  }

  resetProject() {
    this.project = new Project();
    this.managerName = "";
    this.buttonText = "Add";
    this.resetMessages();
    this.resetDates();
  }

  setValueToMainProject(project) {
    this.resetMessages();
    this.project.id = project.id;
    this.project.name = project.name;
    this.project.startDate = this.datePipe.transform(project.startDate, "yyyy-MM-dd");
    this.project.endDate = this.datePipe.transform(project.endDate, "yyyy-MM-dd");
    this.project.priority = project.priority;
    this.project.setDate = project.setDate;
    this.project.manager = project.manager;
    this.setManagerName(this.project.manager);
  }

  resetDates() {
    var date = new Date();

    var dateFormatTotime = new Date(date);
    var endDate = new Date(dateFormatTotime.getTime() + (1 * 86400000));

    this.project.startDate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.project.endDate = this.datePipe.transform(endDate, "yyyy-MM-dd");
  }

  transform(dateVal: string): Date {
    let dateArray = dateVal.split("-");
    console.log(dateVal);
    let dateObject = new Date(parseInt(dateArray[1]), parseInt(dateArray[2]) - 1, parseInt(dateArray[3]));
    return dateObject;
  }

  sortBySelection(str: string) {
    this.resetMessages()
    this.projects = this.service.getAllBySort(str);
  }

  searchManagers() {
    let disposable = this.dialogService.addDialog(UserListComponent, {
      title: 'Users',
      entity: 'user'
    })
      .subscribe(result => {
        if (result && result.id) {
          //alert('accepted' + result.firstName);
          this.project.manager = result;
          this.setManagerName(result);
        }
        // else {
        // alert('declined');
        // }
      });
  }
  searchProjects() {
    this.resetMessages();
    if (this.searchText == "") {
      this.loadAllUsers();
    }
    else {
      this.projects = this.service.getAllBySearch(this.searchText);
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

