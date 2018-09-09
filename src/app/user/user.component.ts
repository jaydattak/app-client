import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from "./user.service";
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user = new User();
  users;
  buttonText = "Add";
  searchText = "";
  successMessage: string = "";
  errorMessage: string = "";
  constructor(private service: UserService) {
    this.users = service.getAll();
  }

  ngOnInit() {
  }

  private loadAllUsers() {
    this.users = this.service.getAll();
  }

  resetUser() {
    this.resetMessages();
    this.user = new User();
  }

  addUser() {
    this.resetMessages();
    if (this.buttonText == "Add") {
      this.service.create(this.user).subscribe((res: any) => {
        if (res.status) {
          this.resetUser();
          this.loadAllUsers();
          this.successMessage = res.message;
        } else {
          this.errorMessage =this.getErrorMessage(res);
        }
      }, error => {
        this.errorMessage = error;
      });
    } else if (this.buttonText == "Update") {
      this.updateUser();
    }
  }

  updateUser() {
    this.resetMessages();
    this.service.update(this.user).subscribe((res: any) => {
      if (res.status) {
        this.resetUser();
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

  deleteUser(id: number) {
    this.resetMessages();
    this.service.delete(id).subscribe((res: any) => {
      if (res.status) {
        this.resetUser();
        this.loadAllUsers();
        this.successMessage = res.message;
      } else {
        this.errorMessage = this.getErrorMessage(res);
      }
    },
      error => {
        this.errorMessage = error;
      });
  }

  editUser(user: User) {
    this.resetMessages();
    this.setValueToMainUser(user);
    this.buttonText = "Update";
  }

  setValueToMainUser(user) {
    this.resetMessages();
    this.user.id = user.id;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.employeeId = user.employeeId;
  }

  resetMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }

  sortBySelection(str: string) {
    this.searchText = "";
    this.resetMessages()
    this.users = this.service.getAllBySort(str);
  }

  /*sortByFirstName() {
    this.searchText = "";
    this.resetMessages();
    this.users = this.service.getAllBySort('firstName');
  }
  sortByLastName() {
    this.searchText = "";
    this.resetMessages();
    this.users = this.service.getAllBySort('lastName');
  }
  sortById() {
    this.searchText = "";
    this.resetMessages();
    this.users = this.service.getAllBySort('id');
  }*/

  searchUsers() {
    this.resetMessages();
    if (this.searchText == "") {
      this.loadAllUsers();
    } else {
      this.users = this.service.getAllBySearch(this.searchText);
    }
  }

  getErrorMessage(res: any) {
    let mesg = res.message ? res.message : '';
    if (res.reason) {
      mesg += ' : ' + res.reason;
    }
    return mesg;
  }
}
