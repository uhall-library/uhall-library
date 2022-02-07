import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { CourseHomeComponent } from './views/course-home/course-home.component';
import { MainPageComponent } from './views/main-page/main-page.component';

import { DetailsComponent } from './views/details/details.component';
import { BooksViewComponent } from './componenets/books-view/books-view.component';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { FinderSettingsComponent } from './admin/views/finder-settings/finder-settings.component';
import { CourseSettingsComponent } from './admin/views/course-settings/course-settings.component';
import { BooksUploadComponent } from './admin/views/books-upload/books-upload.component';
import { LevelsComponent } from './admin/components/levels/levels.component';
import { SemesterComponent } from './admin/components/semester/semester.component';
import { FacultiesComponent } from './admin/components/faculties/faculties.component';
import { ProgramsComponent } from './admin/components/programs/programs.component';
import { UploadFilesComponent } from './admin/components/upload-files/upload-files.component';
import { CreateCourseComponent } from './admin/components/create-course/create-course.component';
import { CreateProgrammeComponent } from './admin/components/create-programme/create-programme.component';


import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ProgressComponent } from './components/progress/progress.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseHomeComponent,
    MainPageComponent,
    DetailsComponent,
    BooksViewComponent,

    AdminHomeComponent,
    FinderSettingsComponent,
    CourseSettingsComponent,
    BooksUploadComponent,
    LevelsComponent,
    SemesterComponent,
    FacultiesComponent,
    ProgramsComponent,
    UploadFilesComponent,
    CreateCourseComponent,
    CreateProgrammeComponent,
    UploadTaskComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
