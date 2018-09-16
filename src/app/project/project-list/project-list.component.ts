import { Component, OnInit, Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ProjectService } from "../../project/project.service";
import { User } from '../../user/user';
import { Project } from '../project';

export interface InputModel {
  title: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})
export class ProjectListComponent extends DialogComponent<InputModel, Project> implements InputModel, OnInit {
  title: string;
  entity: string;
  result: Project;
  searchText: string;
  errorMessage: string = "";
  projects: Array<Project> = [];
 
  constructor(private service: ProjectService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.service.getAll().subscribe((res: any) => {
      this.projects = res;
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  updateSearch() {
    this.service.getAllBySearch(this.searchText).subscribe((res: any) => {
      this.projects = res;
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
