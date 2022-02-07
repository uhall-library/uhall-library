import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-finder-settings',
  templateUrl: './finder-settings.component.html',
  styleUrls: ['./finder-settings.component.scss']
})
export class FinderSettingsComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  currentView: string = "Finder Settings"
route:any ="";


  ngOnInit(): void {
    this.route = this.activeRoute.snapshot.paramMap.get("page");
    this.currentView = "Finder Settings"
    if(this.route?.length> 3){
      this.switchView(this.route);
    }
  }

  switchView(view:string){
this.currentView = view;
const settings = document.getElementById("settings");
if(settings){
  settings.style.display = "none"
}
    const done = document.getElementById("button");
    if (done) {
      done.style.display = "block"
    }
  }


  settingsDone(){


    const settings = document.getElementById("settings");
    if (settings) {
      settings.style.display = "block"
    }
    this.currentView = "Finder Settings"
  }

  backHome(){
    this.router.navigate(["admin-page"])
  }

  back(){
    if (this.currentView !="Finder Settings"){
      this.settingsDone();
    }
  else{
    this.backHome();
  }
  }
}
