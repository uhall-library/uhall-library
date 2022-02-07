import { DataflowService } from './../../../services/dataflow.service';
import { Courses, ProgrammeFiles } from './../../../data-models/datamodels';
import { Component, OnInit } from '@angular/core';
import { doc } from 'rxfire/firestore';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  courses: Courses[] = [];
  file!: File;
  fileItems: any[] = []
  files:any = []
  filesCount:number = 0;
  uploadCount:number = 0;
 
  selectedCourse:any;
  docId:string = "";
  folder:string ="";

  multiple:boolean = true;
  constructor(private dataService: DataflowService) { }
  
  ngOnInit(): void {
    this.dataService.getCourses().subscribe( (data:any)=>{
      this.courses = data.map((document:any)=>({
        ...(document.payload.doc.data() as {})
      } as Courses))
    })
    this.dataService.uploadCounter.subscribe((arg:any) => {this.uploadCount = arg; console.log(arg)});
    
  }

  selectFile() {
    let fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
    
  }

  chooseFiles(event: Event) {
    let file: any = ""
  
    file = (event.target as HTMLInputElement)
    if (file) {
      for (let index = 0; index < file.files.length; index++) {
        this.files.push(file.files[index])

      }
      
      this.filesCount = this.files.length;
      
    }
   this.dataService.uploadedFiles = [];
  }


  upload(file:File){
  let progfile: ProgrammeFiles = {title:"", url:"", course:"", size:0, type:"", id:"", preview:""};
   progfile.title = file.name.split(".")[0];
   progfile.size = file.size
   progfile.type = file.name.split(".")[1]
   progfile.course = this.selectedCourse;
   progfile.id = this.folder;
   this.fileItems.push({progFile:progfile, file:file, path:this.folder, docId: this.docId});
  }

  makeUpload:boolean = false;
  uploadFiles(){
    this.makeUpload = true
    for (let index = 0; index < this.files.length; index++) {
      this.upload(this.files[index])
      
    }
    this.makeUpload = false;
    this.files = [];
    
  
  }

  getCourseId(){
    this.courses.forEach((course:any)=>{
     if(course.course == this.selectedCourse){
       this.docId = course.id
     }
    })
  }





  /*
  @Input() file!: File;
  @Input() docId: string = "";
  @Input() path: string = "";
  @Input() fileItem:any;
  */
}
