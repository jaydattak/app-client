import { Component, OnInit, Input} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../user.service';
import { User } from '../../user/user';

export interface InputModel {
  title: string;
  entity: string;
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
  users = {};
  @Input('entity') model: InputModel;
  constructor(private service: UserService, dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
      this.users = this.service.getAll();
  }

  updateSearch() {
    this.users = this.service.getAll();
  }

  setEntity(item) {
    this.result = item;
    console.log(item)
    console.log(this.result);
    this.close();
  }

  closePopup() {
    this.close();
  }
}







