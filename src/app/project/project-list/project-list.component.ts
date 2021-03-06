import { Component, OnInit, Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ProjectService } from "../../project/project.service";
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
  norecordfound: boolean = false;

  constructor(private service: ProjectService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.service.getAll().subscribe((res: any) => {
      this.projects = res;
      if (this.projects.length > 0) {
        this.norecordfound = false;
      } else {
        this.norecordfound = true;
      }
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  updateSearch() {
    if (this.searchText == "") {
      this.initItems();
    } else {
      this.service.getAllBySearch(this.searchText).subscribe((res: any) => {
        this.projects = res;
        if (this.projects.length > 0) {
          this.norecordfound = false;
        } else {
          this.norecordfound = true;
        }
      },
        error => {
          this.errorMessage = "Issue while getting list";
        });
    }
  }

  setEntity(obj) {
    this.result = obj;
    this.close();
  }

  closePopup() {
    this.close();
  }
}
