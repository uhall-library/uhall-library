import { Courses } from './../../../data-models/datamodels';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataflowService } from "../../../services/dataflow.service";


@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.scss']
})
export class CourseSettingsComponent implements OnInit {
 
  courses: any = [
   
  ]
 route:any = ""
 selectedCourse:any = {}
 menuup:boolean = false;
  constructor(private router: Router, private dataService: DataflowService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getCourses().subscribe((data: any) => {
      this.courses = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Courses)
      );

    });
    this.route = this.activeRoute.snapshot.paramMap.get("selection")
    if(this.route == "selection"){
      this.dataService.getFilteredCourses().subscribe((data: any) => {
        this.courses = data.map(
          (document: any) =>
            ({
              // eslint-disable-next-line @typescript-eslint/ban-types
              ...(document.payload.doc.data() as {}),
              //id: document.payload.doc.id,
            } as Courses)
        );

      });
    }
  }

  back(){
    this.router.navigate(["admin-page"])
  }

  filterCourses(){
    this.router.navigate(["home", "filter-programmes", ""]);
  }

  courseClick(course:any){
 this.selectedCourse = course;
    this.menuup = true;

 this.removeStyles();
 let card = document.getElementById(course.course);
 if( card){

   card.style.border ="2px solid yellow"
 }
  }

  removeStyles(){
    this.courses.forEach((course:any) => {
      const card = document.getElementById(course.course)
      if(card){
        card.style.border = "none"
      }
    });
  }

  viewDetails() {
    this.dataService.selectedCourse = this.selectedCourse;
    this.router.navigate(["/details"])
    this.menuup = false
  }
  editCourse(){
  this.dataService.selectedCourse = this.selectedCourse;
    this.menuup = false
    this.router.navigate(["admin-page", "create-course", "edit"])
  }

  deleteCourse(){
    this.dataService.deleteCourses(this.selectedCourse.id, this.selectedCourse.image, this.selectedCourse.files);
     this.menuup = false
  }

  createCourse(){
    this.router.navigate(["admin-page", "create-course", "create"])
    this.menuup = false
  }

}
