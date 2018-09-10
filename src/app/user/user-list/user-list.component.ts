import { Component, OnInit, Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../user.service';
import { User } from '../../user/user';

export interface InputModel {
  title: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends DialogComponent<InputModel, User> implements OnInit {
  title: string;
  entity: string;
  result: User;
  searchText: string;
  errorMessage: string = "";
  users: Array<User> = [];

  constructor(private service: UserService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.service.getAll().subscribe((res: any) => {
      this.users = res;
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  updateSearch() {
    console.log(this.searchText);
    this.service.getAllBySearch(this.searchText).subscribe((res: any) => {
      this.users = res;
    },
      error => {
        this.errorMessage = "Issue while getting list";
      });
  }

  setEntity(obj) {
    this.result = obj;
    console.log(obj)
    console.log(this.result);
    this.close();
  }

  closePopup() {
    this.close();
  }
}







