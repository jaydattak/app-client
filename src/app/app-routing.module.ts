import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'

import { ProjectComponent }   from './project/project.component';
import { TaskComponent }      from './task/task.component';
import { UserComponent }  from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'project', component: ProjectComponent },
  { path: 'task', component: TaskComponent },
  { path: 'user', component: UserComponent }
];


/*@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})*/

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
