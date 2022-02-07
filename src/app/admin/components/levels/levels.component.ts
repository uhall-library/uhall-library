import { Component, OnInit } from '@angular/core';
import {DataflowService} from 'src/app/services/dataflow.service';
import { Levels, Semesters, Programmes, ProgrammeFiles, Faculties, Departments, FilterCourse } from "../../../data-models/datamodels";
import { Router } from "@angular/router";

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {


  selectedItem:any = {}

levels:Levels[] = [
]
levelsubscribed: any = "";

colorPallet:any = [
]

color:string = "#FFFFF"

  constructor(private dataService: DataflowService, private router:Router) { }

  ngOnInit(): void {
    this.colorPallet = this.dataService.getColors();
    this.levelsubscribed = this.dataService.getLevels().subscribe((data: any) => {
      this.levels = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Levels)
      );
    });
  }

  selectItemtoColor(level:string, prop:string){
    this.selectedItem = {
      level:level, prop:prop
    }

   const darkbg = document.getElementById("request-bg");
   if(darkbg){
     darkbg.classList.add("activeRequest")
   }

    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "block";

  }

  setColor(color:string){
    let newLevels = this.levels;
    newLevels.forEach((level:any) => {
      if(level.level == this.selectedItem.level){
        if(this.selectedItem.prop =="font"){
          level.fontColor =color
        }else if(this.selectedItem.prop== "bg"){
          level.bgColor = color
        }else{
          level.borderColor = color
        }
      }
    });

    this.color = color;
    const colorsDisp = document.getElementById("color-pallet")
    
    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }                          
  }

  changeColor(color:string){
            let flagcolor = ""
              this.setColor(this.color);
            this.colorPallet.forEach((color:string) => {
                if(this.color === color){
            flagcolor = color
                }
            });
       if(flagcolor.length===0){
         //this.colorPallet.push(this.color);
         this.dataService.setColor(this.color);
       }
  }


  closeDialog(){
    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }
  }

  done(){
    this.dataService.updateLevels(this.levels);
    this.router.navigate(['home'])
  }
}
