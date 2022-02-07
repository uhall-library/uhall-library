import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
 @Input() progressChange:number = 1;
 @Input() title:string = "";
 @Input() task:any;

  timer: any;

  percent: number = 1;
  progressWidth: number = 0;
  cancelled:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.calcProgress()
    window.onresize = () => {
      this.resizeLoadingBar();
    }

 this.timer =  window.setInterval( ()=>{
    this.loadProgress();
  }, 100)
  }


  loadProgress() {
    const loadingProgress = document.getElementById(this.title)
    if (this.progressChange <= 100) {
      this.percent = this.progressChange * this.progressWidth
      if (loadingProgress) {
        loadingProgress.style.padding = "10px"
        loadingProgress.style.width = `${this.percent}px`
      }

    }else{
      window.clearImmediate(this.timer)
    }

  }






  calcProgress() {
    const loadingbar = document.getElementById("uploadsbar")
    if (loadingbar) {
      this.progressWidth = loadingbar.clientWidth / 100
    }
  }


  resizeLoadingBar() {
    const loadingbar = document.getElementById("uploadsbar")
    if (this.progressChange == 100) {
      const loadingProgress = document.getElementById(this.title)
      if (loadingProgress && loadingbar) {
        loadingProgress.style.width = `${loadingbar.clientWidth}px`
      }
    }
  }

}
