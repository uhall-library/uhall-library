import { Router } from '@angular/router';
import { Programmes } from './../../../data-models/datamodels';
import { DataflowService } from './../../../services/dataflow.service';
import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

 scrollTimer:number = -1;
  @HostListener('window:scroll') onScrollHost(e: Event): void {
    const newProgramBtn = document.getElementById("new-program")
      if(newProgramBtn)
      newProgramBtn.classList.add("small-button")

      if (this.scrollTimer != -1)
        clearTimeout(this.scrollTimer);

      this.scrollTimer = window.setTimeout(()=>{
        const newProgramBtn = document.getElementById("new-program")
        if (newProgramBtn) {
          newProgramBtn.classList.remove("small-button")
        }
      }, 100);
  }

    



  selectedItem: any = {}

  programmes: Programmes[] = [

  ]
  programmesSubscribed:any = ""



  constructor(private dataService: DataflowService, private router: Router) { }

  ngOnInit(): void {
    this.programmesSubscribed = this.dataService.getProgrammes().subscribe((data: any) => {
      this.programmes = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Programmes)
      );
    });

  }

 editProgramme(programme: Programmes){
  this.dataService.selectedProgramme = programme;
   this.router.navigate(["admin-page", "create-programme", "edit"])
 }
 selectedProgramme:any;
  confirmDelete(programme: string){
 this.selectedProgramme = programme;
    const confirmDelete = document.getElementById("confirm-delete");
    if(confirmDelete){
      confirmDelete.style.display = "block";
    }
    
 }
 cancelDelete(){
   const confirmDelete = document.getElementById("confirm-delete");
   if (confirmDelete) {
     confirmDelete.style.display = "none";
   }
 }

 deleteProgramme(programme:string){
   this.dataService.deleteProgrammes(programme)
   const confirmDelete = document.getElementById("confirm-delete");
   if (confirmDelete) {
     confirmDelete.style.display = "none";
   }
   //this.programmes = this.dataService.getProgrammes();
 }

 createProgramme(){
   this.router.navigate(["admin-page", "create-programme"])
 }
}
