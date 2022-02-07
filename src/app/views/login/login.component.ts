import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  observable = Observable.create( (observer:any) => {
    try{
     
     observer.next("hey guys"),
      observer.next("how are you?"),
       observer.complete()
   }catch(err){
     observer.error(err)
   }
   }
  )
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    
this.observable.subscribe( 
  (x:any) => this.addItem(x),
   (error:any) => this.addItem(error),
    () => this.addItem("Completed")
  ) }

addItem(val:any){
  let node = document.createElement("li");
  let textnode = document.createTextNode(val);
  node.appendChild(textnode);
  node.classList.add("li")
  node.style.padding = "20px";
  node.style.backgroundColor = "white"
  node.style.marginBottom = "20px"
  document.getElementById("output")?.appendChild(node)
}




  navHome(){
    this.router.navigate(["home"])
  }
}
