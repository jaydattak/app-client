import { NgModule, ViewContainerRef, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from "ng2-bootstrap-modal";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { ProjectService } from "./project/project.service";
import { TranslateService } from "./translate.service";
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';

import { AppRoutingModule }  from './app-routing.module';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TranslatePipe } from './translate.pipe';
import { UserListComponent } from './user/user-list/user-list.component';
import { ParentTaskListComponent } from './task/parent-task-list/parent-task-list.component';

export function translateFactory(service : TranslateService) : Function {
  return () => service.setLanguageForProperty('en');
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    UserComponent,
    ProjectListComponent,
    TranslatePipe,
    UserListComponent,
    ParentTaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  entryComponents: [
    ProjectListComponent,
    UserListComponent,
    ParentTaskListComponent
    ],
  providers: [DatePipe, TranslateService,
  {
    provide: APP_INITIALIZER,
    useFactory : translateFactory,
    deps : [TranslateService],
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

