import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from "../../data-models/datamodels";
import {DataflowService} from 'src/app/services/dataflow.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router,private dataService: DataflowService) { }

 
  courses: Courses[] = []
  grid_view = false;
  grid_text = "Grid View"

  toggle_menu = false;
  ngOnInit(): void {
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

  changeView(){
    this.grid_view = !this.grid_view
    if(this.grid_view){
     this.grid_text = "List View"
    }else{
      this.grid_text = "Grid View"
    }
  }



  navLogin() {
    this.router.navigate(["home", "", ""])
  }
  navMainPage() {
    this.router.navigate(["main-page"])
  }
  toggleMenu(toggle = false) {

    this.toggle_menu = toggle

  }
  detailsView(course:Courses){
    this.dataService.selectedCourse = course;
    this.router.navigate(["/details"])
  }

  adminPage(){
    this.router.navigate(['admin-page'])
  }
}
