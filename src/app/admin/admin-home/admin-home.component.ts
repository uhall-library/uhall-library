import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  
  view =""

 route:any =""
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.route = this.activeRoute.snapshot.paramMap.get("page");
    if(this.route ==="create-course"){
      this.switchView("add-course");
    }else if(this.route ===  "create-programme"){
      this.switchView("add-programme")
    }
  }


  finderPage(){
    this.router.navigate(["admin/finder"])
  }

  CoursesPage() {
    this.router.navigate(["admin/folders", ""])
  }


  openPopup(){
    const popup = document.getElementById("popup");
    const open = document.getElementById("icon");
    if(popup && open){ 
      popup.style.display ="flex";
      open.style.display="none"
    }
    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.add("activeRequest")
    }
  }

  uploadActions(){
    const popup = document.getElementById("popup");
    const open = document.getElementById("icon");
    if (popup && open) {
      popup.style.display = "none";
      open.style.display = "block"
    }
    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }

   
  }

  switchView(view:string){
     this.view = view
  }

  back(){
    if(this.view.length != 0){
      this.view = ""
    }
    else{
      this.router.navigate(["home", "", ""])
    }
  }

  closeDialog() {
  
    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }

    const popup = document.getElementById("popup");
    const open = document.getElementById("icon");
    if (popup && open) {
      popup.style.display = "none";
      open.style.display = "block"
    }
  }
}
