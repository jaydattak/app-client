import { Component, OnInit, Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ProjectService } from "../../project/project.service";
import { User } from '../../user/user';


export interface InputModel {
title: string;
entity : string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})
export class ProjectListComponent extends DialogComponent<InputModel, User> implements InputModel, OnInit  {
  title : string;
  entity : string;
  result : User;
  searchText : string;
  items;
  @Input('entity') model: InputModel;
  constructor(private projectService : ProjectService, dialogService: DialogService) { 
  super(dialogService);
  }
  
  ngOnInit() {
    if(this.entity == "user"){
      this.items = this.projectService.getAllBySearch('priority');
    }else {
      console.log("Nothing selected");
    }
  }

  updateSearch(){
  this.items = this.projectService.getAllBySearch('priority');
  }
  
  setEntity(projectObj){
  this.result =  projectObj;
  console.log(projectObj)
  console.log(this.result);
  this.close();
  }
  
  closePopup() {
  this.close();
  }
}







