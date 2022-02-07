import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { Courses } from "../../data-models/datamodels";
import {DataflowService} from 'src/app/services/dataflow.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],

})
export class DetailsComponent implements OnInit {



 
  constructor(private router: Router, private dataService: DataflowService) {

   }
  course:any = {};
  bgImage: string = "";
  title: string = "";
  views:number = 0;
  id: string = ""


 

  coursematerials:any [] = [
   
  ]

books: any = [];

  sliders = [
    "slide-1",
    "slide-2",
    "slide-3"
  ]





  ngOnInit(): void {
    this.course = this.dataService.selectedCourse;
    this.bgImage = this.course.image;
    this.title = this.course.course;
    this.views = this.course.views;
    this.id = this.course.id;
    this.coursematerials = this.course.files;
    this.slide(0, "all")
  }



  tooglePanes(pane:string){
    this.books = []
    if(pane === "all"){
      this.books = this.coursematerials;
    }else{
      this.coursematerials.forEach(item => {
        if(
          item.id == pane
        ){
        
          this.books.push(item)
        }
      });
    }
  }

  slide(slide: number, pane:string){
         let slides:any = [];
    this.tooglePanes(pane)
         this.sliders.forEach( (sld, index) =>{
          slides.push(document.getElementById(sld));
          slides[index].classList.remove("active");
           
         })


    slides[slide].classList.add("active")
  }



  back(){
   this.router.navigate(["main-page"])
  }

}
