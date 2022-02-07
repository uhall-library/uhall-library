import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseHomeComponent } from "./views/course-home/course-home.component";

import { LoginComponent } from "./views/login/login.component";

import { MainPageComponent } from "./views/main-page/main-page.component";
import { DetailsComponent } from "./views/details/details.component";
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


import { FinderSettingsComponent } from './admin/views/finder-settings/finder-settings.component';
import { CourseSettingsComponent } from './admin/views/course-settings/course-settings.component';
import { BooksUploadComponent } from './admin/views/books-upload/books-upload.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: "admin-page",
    pathMatch: "full"
//CourseHomeComponent//AdminHomeComponent//LoginComponent
  },
  {
    path:"home",
    component: CourseHomeComponent
  },
  {
    path: "home/:selection/:mode",
    component: CourseHomeComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"main-page",
    component: MainPageComponent
  },
  {
    path: "courses/:id",
    component: MainPageComponent
  },
  {
    path: "details",
    component: DetailsComponent
  },
  {
    path:"admin-page",
    component: AdminHomeComponent
  },
  {
    path: "admin-page/:page",
    component: AdminHomeComponent
  },
  {
    path: "admin-page/:page/:mode",
    component: AdminHomeComponent
  },
  {
    path: "admin/finder",
    component: FinderSettingsComponent
  },
  {
    path: "admin/finder/:page",
    component: FinderSettingsComponent
  },
  {
    path: "admin/folders/:selection",
    component: CourseSettingsComponent
  },
  {
    path: "admin-page-folder/upload",
    component: BooksUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
