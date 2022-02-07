import { Router, ActivatedRoute } from '@angular/router';
import { Programmes } from './../../../data-models/datamodels';
import { DataflowService } from './../../../services/dataflow.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-create-programme',
  templateUrl: './create-programme.component.html',
  styleUrls: ['./create-programme.component.scss']
})
export class CreateProgrammeComponent implements OnInit, AfterViewInit {

  programmeName ="";
  faculties:any = [
    {
      name:"FoE",
      id:"fac",
      value: "foe"
    }, {
      name: "FGES",
      id: "fac",
      value: "fges"
    }, {
      name: "FMMT",
      id: "fac",
      value: "fmmt"
    },  {
      name:"SPETs",
      id:"fac",
      value: "spets"
    }
  ]
  programme: Programmes = {

    programme: "",
    fontColor: "#353745",
    bgColor: "#E5E7ED",
    faculty: "",
    id: "",
    selected: false
  }

  colorPallet: any = [
  "#444746", "#C2E7FF", "#F1F5FB",
  ]

  color: string = "#FFFFF"


  route:any = "";
  constructor(private dataService: DataflowService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.route = this.activeRoute.snapshot.paramMap.get("mode");
    if(this.route =="edit"){
      this.programme = this.dataService.selectedProgramme;
      this.programmeName = this.dataService.selectedProgramme.programme;
     
      this.switchProgramme(this.programme.faculty)
    }
  }

  ngAfterViewInit() :void{
    if (this.route == "edit") {

   
      this.switchProgramme(this.programme.faculty)
    }
  }
  



  switchProgramme(id:string){
    
    this.faculties.forEach((fac:any) => {
      if(fac.value === id){
        this.programme.faculty = fac.value.toLowerCase();
        const el = document.getElementById(fac.value);
        const radioBtn = document.getElementById(fac.value + 's')
        if(el && radioBtn){
         
          el.classList.add("acitve")
          el.style.backgroundColor ="#DFDFDF "
          el.style.borderRadius ="10px"
          radioBtn.setAttribute("checked", "true")
        }
      }else{
        const el = document.getElementById(fac.value);
        const radioBtn = document.getElementById(fac.value + 's')
        if (el && radioBtn) {
          el.classList.remove("acitve")
          el.style.backgroundColor = "white"
          el.style.borderRadius = "0px";
          radioBtn.removeAttribute("checked")
        }
      }
    });
  }




 selectedItem:any;
  selectItemtoColor(programme: string, prop: string) {
    this.selectedItem = {
      programme: programme, prop: prop
    }

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.add("activeRequest")
    }

    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "block";

    const main = document.getElementById("programme-card")
    if(main){
      main.style.zIndex = "0"
    }

  }

  setColor(color: string) {
    let newProgrammes = this.programme;
   
     
        if (this.selectedItem.prop == "font") {
          this.programme.fontColor = color
        } else if (this.selectedItem.prop == "w") {
          this.programme.bgColor = color
        } else {
          // programme.d = color
        }
      
   

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

  changeColor(color: string) {
    let flagcolor = ""
    this.setColor(this.color);
    this.colorPallet.forEach((color: string) => {
      if (this.color === color) {
        flagcolor = color
      }
    });
    if (flagcolor.length === 0) {
      this.colorPallet.push(this.color)
    }
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









  addProgramme(){
    if (this.route == "edit") {
      this.dataService.updateProgrammes(this.programme)
    }else{
    this.programme.programme = this.programmeName;
    this.programme.id = this.programmeName + this.programme.faculty;
    this.dataService.setProgrammes(this.programme);
 
  }
    this.router.navigate(["admin/finder", "Programmes"])

}

 


}
