import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ParentTaskService } from './parent-task.service';
import { ParentTask } from './parent-task';


export interface InputModel {
  title: string;
}

@Component({
  selector: 'app-parent-task-list',
  templateUrl: './parent-task-list.component.html',
  styleUrls: ['./parent-task-list.component.css']
})
export class ParentTaskListComponent extends DialogComponent<InputModel, ParentTask> implements OnInit {

  title: string;
  entity: string;
  result: ParentTask;
  searchText: string;
  errorMessage: string = "";
  parentTasks: Array<ParentTask> = [];

  constructor(private service: ParentTaskService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.service.getAll().subscribe((res: any) => {
      this.parentTasks = res;
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  updateSearch() {
    this.service.getAllBySearch(this.searchText).subscribe((res: any) => {
      this.parentTasks = res;
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  setEntity(obj) {
    this.result = obj;
    this.close();
  }

  closePopup() {
    this.close();
  }
}