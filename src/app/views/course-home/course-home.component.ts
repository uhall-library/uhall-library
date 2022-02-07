


import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';


import {DataflowService} from 'src/app/services/dataflow.service';
import { Levels, Semesters, Programmes, Faculties, FilterCourse } from "../../data-models/datamodels";

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss'],
})
export class CourseHomeComponent implements OnInit, AfterViewInit {


  

  constructor(private router:Router, private dataService: DataflowService, private activatedRoute: ActivatedRoute) { }

 




levels: Levels[] = [];
semesters: Semesters[] = [];
faculties: Faculties[] = [];
programmes: Programmes[] = [];
filter_Course: FilterCourse = { programme: "", programmes: [], faculties: [], semester:"", level:"", faculty:""}
programmesList:any = [];
 

 levelsubscribed:any ="";
 semestersubscribed: any = "";



  toggle_menu = false;
  toggle_faculties = false;

  routeParameter:any = "";
  createRouteParameter:any = ""
 
 timer:any = "";
 counter:number = 0;
  ngOnInit(): void {
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

   this.semestersubscribed = this.dataService.getSemesters().subscribe((data: any) => {
      this.semesters = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Semesters)
      );
   
    });
  
    this.semestersubscribed = this.dataService.getProgrammes().subscribe((data: any) => {
      this.programmes = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Programmes)
      );
     
    });

    this.semestersubscribed = this.dataService.getFaculties().subscribe((data: any) => {
      this.faculties = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Faculties)
      );


      if(this.routeParameter == "selection"){

      
        this.setSelectedLevel();
           this.setSelectedSemester();
           this.setSelectedProgrammes();
           this.displayHeader();
      
      }else{
        this.getCourses("foe", 0, this.faculties[0])
      }
    });




    this.routeParameter = this.activatedRoute.snapshot.paramMap.get("selection");
    this.createRouteParameter = this.activatedRoute.snapshot.paramMap.get("mode");
    this.dataService.editMode = this.createRouteParameter;
    this.displayHeader();
   
    this.getCourses("foe", 0, this.faculties[0])
    this.toogleFaculties("foe")
    if (this.routeParameter == "selection") {
      this.faculties.forEach(fac => {

        fac.active = false;

      })
 
    
    }
  
}

ngAfterViewInit():void{


}



  displayHeader(){
   const header = document.getElementById("header");
  
    if (header && this.routeParameter !== "selection"){
     header.style.display = "block"
   }
   
  }

  setSelectedLevel(){
    
    this.levels.forEach((level:any, i:number)=>{
      if(level.level == this.dataService.selectedCourse.level) {
        this.toogleLevel(level.id); 
        this.filter_Course.level = level.level
      }
    })
   
  }

  setSelectedSemester(){
    this.semesters.forEach((semester: any, i: number) => {
      if (semester.semester == this.dataService.selectedCourse.semester) {
      this.toogleLevel(semester.id, this.semesters); 
      this.filter_Course.semester = semester.semester
      }
    })
  }


  setSelectedProgrammes(){
   
    this.programmes.forEach((programme: any, j: number) => {
       this.dataService.selectedCourse.programmes.forEach(prog =>{
         if (programme.programme == prog) {
           this.onclickCourse(programme)
           this.filter_Course.programmes.push(programme.programme)
         }
       })
     
    })

   
  }



  getCourses(filter:any="foe", id:any = 4, faculty:any){
   if(this.routeParameter != "selection"){
      this.toogleFaculties(filter)
   }else{

     if(faculty.faculty != "all" ) {
       this.toogleFaculties(faculty)
     }
     
   }
    this.programmesList = [];
     if(filter && filter != "all"){
     
       this.programmes.forEach(prog =>{
         if(prog.faculty.toLowerCase() == filter.toLowerCase()){
           this.programmesList.push(prog)
         }
       })
     }else{
       this.programmesList = this.programmes
     }
 
  }


  


// Toggle between different faculties

toogleFaculties(faculty:any = "foe"){
 if(this.routeParameter != "selection"){
   this.singleSelectFaculty(faculty)
 }else{
   
  this.multiselectFaculties(faculty)
 }
 
}


singleSelectFaculty(id:string){
  
  this.faculties.forEach(fac => {
    if (fac.faculty.toLowerCase() == id.toLowerCase()) {
      fac.active = true;
      this.selectedFaculty = fac.faculty.toUpperCase()
      this.filter_Course.faculty = id;

    } else {
      fac.active = false;
    }
  })
  
}

multiselectFaculties(faculty:any){

  if(faculty.active == false){

    this.filter_Course.faculties.push(faculty.faculty)
   
    this.faculties.forEach(fac => {
       if(fac.faculty.toLowerCase() == faculty.faculty.toLowerCase()){
         fac.active = true;
       }
    })
  }else{
    this.filter_Course.faculties = this.filter_Course.faculties.filter((fac:any)=> fac != faculty.faculty);
   
    this.faculties.forEach(fac => {
     
      if (fac.faculty.toLowerCase() === faculty.faculty.toLowerCase()) {
        fac.active = false;
        let facBtn = document.getElementById(faculty.id)
        if(facBtn){
        
        }
        
      }
    })
  }
 

 
}

toggleFaculty(){
  this.toggle_faculties = !this.toggle_faculties
}




/// Handle toggling between different levels
  levelBtns: any = []
  toogleLevel(id:string, options:any = this.levels){
  this.levelBtns = []
  let bgColor:any;
  options.forEach((fac:any)=>{
    this.levelBtns.push(document.getElementById(fac.id))  
      if(fac.id === id){
bgColor = fac.bgColor;
      }
  });


  this.levelBtns.forEach((btn:any) => {
      btn.style.backgroundColor = "white";
      btn.style.fontWeight ="normal"
  });

  this.switchLevel(id, bgColor)
}

switchLevel(id:string, bgcolor:string){
   const btn = document.getElementById(id);
if(btn){
  btn.style.backgroundColor = bgcolor;
  btn.style.fontWeight ="bold"
}
}




/// Handle programme changes
selectionList:any = [];
onclickCourse(programme:any){
 
const doc = document.getElementById(programme.id);

this.filter_Course.programme = programme.programme;


  if (this.routeParameter === "selection") {
   
    this.multiSelection(programme)
    let doneBtn = document.getElementById("done-btn")
    if(doneBtn){
      doneBtn.style.display="block"
    }
  }else{
    this.singleSelection(doc, programme)
  }


this.validateSelection();
}


singleSelection(doc:any, programme:any){
  if (doc) {
    //doc.style.fontSize = "20px"
    //doc.style.fontWeight = "bold"
    doc.style.fontWeight = "bold"
    doc.style.backgroundColor = programme.bgColor
    doc.style.border = "1px solid " + programme.fontColor
  }
  this.programmes.forEach(c => {
    const doc = document.getElementById(c.id);
    if (doc && c.id != programme.id) {
      //  doc.style.fontSize = "15px"
      doc.style.fontWeight = "normal"
      doc.style.backgroundColor = "white"
      doc.style.border = "1px solid " + programme.fontColor
    }
  })

}

multiSelection(currentProg:any){
  let doc = document.getElementById(currentProg.id);
  if (doc) {
    if(!currentProg.selected){
      doc.style.fontWeight = "bold";
      doc.style.backgroundColor = currentProg.bgColor;
      doc.style.border = "1px solid " + currentProg.fontColor;
      this.filter_Course.programmes.push(currentProg.programme);
     
      this.programmes.forEach(prog =>{
        if(prog.id === currentProg.id){
          prog.selected = true
        }
      })
    }
 else{
      doc.style.fontWeight = "normal"
      doc.style.backgroundColor = "white"
      doc.style.border = "1px solid " + currentProg.fontColor;
      this.filter_Course.programmes = this.filter_Course.programmes.filter( (prog:string)=> prog != currentProg.programme)
     
      this.programmes.forEach(prog => {
        if (prog.id === currentProg.id) {
          prog.selected = false
        }
      })
 }
  }


  

}




validateSelection(){
  if(this.filter_Course.level.length > 0 && this.filter_Course.semester.length > 0 && this.filter_Course.programme.length> 0){
    if(this.routeParameter !== "selection"){
        this.dataService.filterCourses(this.filter_Course.level, this.filter_Course.semester, this.filter_Course.programme)
     
        if (this.routeParameter === "filter-programmes"){
          this.router.navigate(["admin/folders", "selection"])
        }else{
          this.navMainPage()
        }

      
    }else{
     
     
    }
   
  }
}




filterProgrammes(){
  let occurance:any = 0

  this.filter_Course.programmes.forEach(prog => {
   occurance =   this.filter_Course.programmes.filter( (p:string)=> p == prog)
   //console.log(occurance)
   if(occurance.length > 1){
    this.filter_Course.programmes[this.filter_Course.programmes.indexOf(prog)] = " "
   //console.log(this.filter_Course.programmes)
   }
  });
  this.filter_Course.programmes = this.filter_Course.programmes.filter((p: string) => p != " ")
  //console.log(this.filter_Course.programmes)
  this.dataService.filter_Course = this.filter_Course;
  this.dataService.selectedCourse.programmes = this.filter_Course.programmes;
  //console.log(this.dataService.filter_Course)
}

done(){
 // this.validateSelection();
  //console.log(this.dataService.editMode)
  this.filterProgrammes();
  if (this.dataService.editMode == "edit"){

  this.router.navigate(["admin-page", "create-course", "edit"])
}else{
  

  this.router.navigate(["admin-page", "create-course", "create"])
}
}





toCourses(name:string){
 this.router.navigate(['courses', name])
}

selectedFaculty = "All"

  navLogin(){
    this.router.navigate(["login"])
  }
  navMainPage() {
    this.router.navigate(["main-page"])
  }
  toggleMenu(toggle = false){
    
    this.toggle_menu = toggle

  }
}
