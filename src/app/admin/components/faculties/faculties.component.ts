import { Router } from '@angular/router';
import { DataflowService } from 'src/app/services/dataflow.service';
import { Faculties } from './../../../data-models/datamodels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit {


  selectedItem: any = {}

  faculties: any = [
   
  ]


  faculty: string = ""
  mode:string = "edit"

  constructor(private router: Router, private dataService: DataflowService) { }

  ngOnInit(): void {
    this.dataService.getFaculties().subscribe((data: any) => {
      this.faculties = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Faculties)
      );
    });
  }

  selectItemtoColor(_id: string, faculty:string) {
    this.faculty = faculty;
    this.selectedItem = {
      id: _id
    }

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.add("activeRequest")
    }

    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "block";

  }

  setColor(faculty: string) {
   if(this.mode == "edit"){
     this.faculties.forEach((fac: any) => {
       if (fac.id == this.selectedItem.id) {
         fac.faculty = faculty;
       }
     });

   }else{

    // this.faculties.push({ faculty: this.faculty, id: "", active: false })
     // console.log(this.faculties)
      this.dataService.setFaculties({ faculty: this.faculty, id: "", order: this.faculties.lenght + 1, active: false });

   }

    this.faculty = faculty;
    const colorsDisp = document.getElementById("color-pallet")

    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }
  }

  changeColor() {  
    
      this.setColor(this.faculty);
  
  }


  createFaculty(){
    this.mode = "create";
    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.add("activeRequest")
    }

    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "block";

  }

  deleteFaculty(){
    this.dataService.deleteFaculties(this.selectedItem.id)
    this.closeDialog();
  }

  closeDialog() {
    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }
  }
}
