import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';
import { DataflowService } from "../../../services/dataflow.service";
import {  FilterCourse, Courses } from "../../../data-models/datamodels";
import { Router, ActivatedRoute } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
   courseName:string = "";

  courseItem: Courses = {
    course: "",
    programmes:[],
    faculties:[],
    semester: "",
    level: "",
    image: "",
    fontColor: "",
    views: 0,
    id: "",
    files: [],
    liked: false
  };
  ok = false;
  route:any = "";

  filePath: string = "../../../../assets/admin-header.png";
  image: string = "../../../../assets/admin-header.png";
  downloadURL: any = "";
  imageChange:boolean = false;

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<any>;

  selectOptions: FilterCourse = { programmes: [], programme: "", faculties: [], semester: "", level: "", faculty: "" }
  constructor(private dataService: DataflowService, private router: Router,
              private activeRoute: ActivatedRoute, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    
    this.dataService.selectionMode = "select-options";
    this.route = this.activeRoute.snapshot.paramMap.get("mode");
    if (this.route == "edit") {
      this.dataService.editMode = "edit"
      this.courseItem = this.dataService.selectedCourse;
      this.courseName = this.dataService.selectedCourse.course;
      this.filePath = this.dataService.selectedCourse.image
      this.dataService.previousImage = this.dataService.selectedCourse.image;
      this.patchOptions(this.courseItem)
    }
    else{
      
      this.dataService.editMode = "create"
      this.selectOptions = this.dataService.filter_Course;
      this.filePath = this.dataService.selectedProgrammeImage;
      this.courseName = this.dataService.selectedCourse.course;
   
      this.dataService.selectionMode = "select-options"
    
    }
    
  }

  patchOptions(options:any){
 this.selectOptions.programmes = options.programmes;
 this.selectOptions.faculties = options.faculties;
 this.selectOptions.semester = options.semester;
 this.selectOptions.level = options.level;
  }



  selectImage(){
    let fileInput = document.getElementById("file-input");
    if(fileInput){
      fileInput.click();
    }
  }



  imagePreview(event: Event){
     let file:any = ""
    
      file = (event.target as HTMLInputElement)
      if(file){
        file = file.files[0];
      
    }

    
      
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageChange == true;
      this.filePath = reader.result as string;
      this.dataService.selectedProgrammeImage = this.filePath;
      this.dataService.selectedProgrammeImageFile = file;
      this.dataService.imageChange = true;
    }
    reader.readAsDataURL(file)
  }

 
 

  makeSelection(){
    this.ok == true
    this.dataService.selectedCourse.course = this.courseName;
    if(this.route !== "edit"){
      this.router.navigate(["home", "selection", "create"]);
    }else{
      
      this.router.navigate(["home", "selection", "edit"]);
    }


  }


  createCourse(image:any = ""){
    this.courseItem.faculties = []
    this.courseItem.programmes = []
    let courseId: string = ""
    if (this.dataService.editMode !== "edit"){
       courseId = (this.courseName + this.selectOptions.programme).replace(" ", "-");
      this.courseItem.id = courseId;
    }
    this.selectOptions.programmes.forEach((prog:string)=>{
      this.courseItem.programmes.push(prog)
    })
    this.selectOptions.faculties.forEach((fac: string) => {
      this.courseItem.faculties.push(fac)
    })
    
    this.courseItem.course = this.courseName;
    //this.courseItem.programme = this.selectOptions.programmes;
    this.courseItem.semester = this.selectOptions.semester;
    this.courseItem.level = this.selectOptions.level;
   
    if (image.length != 0 ){
      this.courseItem.image = image;
    } else if (this.dataService.editMode !== "edit"){
      this.courseItem.image = ""
    }
   
    if(this.courseItem.level.length === 3 && this.courseName.length > 4){
      
      if (this.dataService.editMode !=="edit") {
       //console.log(this.courseItem)
      this.dataService.setCourses(this.courseItem);
   
      }else{
        //console.log("ereiruureuur")
        this.dataService.updateCourses(this.courseItem);
        if (this.dataService.imageChange == true) {
          this.dataService.deleteDuplicateImage(this.dataService.previousImage);
        }
      }
      this.dataService.imageChange = false;
      this.imageChange = false;
      this.dataService.resetCourse();
      this.router.navigate(["admin/folders", ""]);
  }
}


hideBtn = true;
  uploadCourse() {
    this.hideBtn = false;
    if (this.dataService.imageChange === true) {
      const file = this.dataService.selectedProgrammeImageFile
      const path = `/images/${Date.now()}_${file.name}`;
      // create a reference to the storage bucket location
      this.ref = this.afStorage.ref(path);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      this.task = this.ref.put(file);

      // AngularFireUploadTask provides observable
      // to get uploadProgress value
      // this.uploadProgress = this.task.snapshotChanges()
      // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

      // observe upload progress
      this.uploadProgress = this.task.percentageChanges();
      
      // get notified when the download URL is available
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
         this.downloadURL.subscribe((image:any)=>{
           this.createCourse(image);
         })
         
        })
      )
        .subscribe();
    } else {

      this.createCourse();
    }
   
  }

}
