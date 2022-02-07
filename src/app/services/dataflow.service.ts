
import { AngularFireStorage } from '@angular/fire/compat/storage';


import * as firebase from '@angular/fire/firestore'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { BehaviorSubject } from "rxjs";

import { Injectable } from '@angular/core';
import { Levels, Semesters, Programmes, ProgrammeFiles, Faculties, Departments, Courses, FilterCourse } from "../data-models/datamodels";

import { Router } from '@angular/router';

interface Item {
  name: string
}



@Injectable({
  providedIn: 'root'
})
export class DataflowService {

  //private itemDoc: AngularFirestoreDocument<Item>;


  constructor(private afs: AngularFirestore, private afStore: AngularFireStorage) {

  }





  levels: Levels[] = [


  ]

  semesters: Semesters[] = [

  ]

  departments: Departments[] = [

  ]


  faculties: Faculties[] = [
        {
      faculty: "all",
      id: "all",
      active: false,
      order:1
    },
    {
      faculty: "fmmt",
      id:"fmmt",
      active:false,
      order:5,
    },
    {
      faculty: "foe",
      id: "foe",
      active: true,
      order:3
    },
    {
      faculty: "fges",
      id: "fges",
      active: false,
      order: 2
    },
    {
      faculty: "spets",
      id: "spets",
      active: false,
      order: 4
    }
  ]



  programmes: Programmes[] = [

  ]

  files: ProgrammeFiles[] = [

  ]
  courses: Courses[]= [


  ]

  filter_Course: FilterCourse = { programme: "", programmes: [], faculties: [], semester:"", level:"", faculty:""}
colorPallet:any = [
  "#444746", "#C2E7FF", "#F1F5FB",
]

courseList:Courses[] = [];
selectedCourses:any = [];
selectedProgramme: Programmes  = this.programmes[0];
  selectedCourse: Courses = {
    course: "",
    programmes: [],
    faculties: [],
    semester: "",
    level: "",
    image: "",
    fontColor: "",
    views: 0,
    id: "",
    files: [],
    liked: false
  };
selectionMode:string = "selection";
editMode: string = "selection";
  selectedProgrammeImage: string = "../../../../assets/admin-header.png";
  selectedProgrammeImageFile:any = ""
  imageChange:boolean = false;
  previousImage:string = "";
  uploadedFiles: string[] = [];
  uploadCounter = new BehaviorSubject(0);


  resetCourse(){
    this.courseList = [];
    this.selectedCourses = [];
    this.selectedProgramme = this.programmes[0];
    this.selectedCourse = {
      course: "",
      programmes: [],
      faculties: [],
      semester: "",
      level: "",
      image: "",
      fontColor: "",
      views: 0,
      id: "",
      files: [],
      liked: false
    };
    this.selectionMode = "selection";
    this.editMode =  "selection";
    this.selectedProgrammeImage = "../../../../assets/admin-header.png";
    this.selectedProgrammeImageFile = "";


    this.filter_Course = { programme: "", programmes: [], faculties: [], semester: "", level: "", faculty: "" }
  }


// Functions to handle levels setup and updates
  getLevels(){
    return this.afs.collection('levels', (ref) => ref.orderBy("level", "asc")).snapshotChanges();
  }

  setLevel(level:Levels){
   this.afs.collection("levels").add(level)
  }

 async updateLevels(levels:Levels[]){
    let index:number = 0;
   let collection = await this.afs.collection("levels").get().subscribe(function (querySnapshot:any) {
     querySnapshot.forEach(function (doc:any) {
       doc.ref.update({
         ...levels[index]
       });
       index++;
     });
   });


  }
  deleteLevel(id:number){
    delete this.levels[id]
  }


// Functions to handle semesters updates
  getSemesters(){
    return this.afs.collection('semesters', (ref) => ref.orderBy("semester", "asc")).snapshotChanges();
  }
  setSemester(semester:Semesters){
    this.afs.collection("semesters").add(semester)
  }
  async updateSemesters(semesters:Semesters[]){
    let index: number = 0;
    await this.afs.collection("semesters").get().subscribe(function (querySnapshot: any) {
      querySnapshot.forEach(function (doc: any) {
        doc.ref.update({
          ...semesters[index]
        });
        index++;
      });
    });

  }
  deleteSemesters(id:number){
    delete this.semesters[id]
  }




// Functions to handle faculties updates

  getFaculties(){
    return this.afs.collection('faculties', (ref) => ref.orderBy("order", "asc")).snapshotChanges();
  }
  async setFaculties(faculty:Faculties){
    const docRef =  this.afs.collection("faculties")
  const queryRef =  await docRef.add(faculty).then( async function (doc: any) {
         await docRef.doc(doc.id).update({id: doc.id})
    });
  }
  updateFaculties(id:number, faculty:Faculties){
    this.faculties[id] = faculty;
  }

  deleteFaculties(id:string){
    this.afs.collection("faculties").doc(id).delete()
  }


  // Functions to handle programmes updates

  getProgrammes(){
    return this.afs.collection('programmes').snapshotChanges();
  }

  async setProgrammes(programme:Programmes){
    const docRef = this.afs.collection("programmes")
    const queryRef = await docRef.add(programme).then(async function (doc: any) {
      await docRef.doc(doc.id).update({ id: doc.id })
    });
  }

  async updateProgrammes(programme:Programmes){
      const docRef = await this.afs.collection("programmes").doc(programme.id).update({
        ...programme
      })

  }
  async deleteProgrammes(programme:string){
    const docRef = await this.afs.collection("programmes").doc(programme).delete()

  }

    // Functions to handle files updates

  getCourses(){
    return this.afs.collection('courses').snapshotChanges();
  }

 async setCourses(courses:Courses){
    const docRef = this.afs.collection("courses")
    const queryRef = await docRef.add(courses).then(async function (doc: any) {
      await docRef.doc(doc.id).update({ id: doc.id })
    });
  }
  async updateCourses(course:Courses){
    const docRef = await this.afs.collection("courses").doc(course.id).update({
      ...course
    })
  }

  async deleteCourses(courseId:string, courseImage:string, files:ProgrammeFiles[]){
    const docRef = await this.afs.collection("courses").doc(courseId).delete();


    if(files.length > 0){
      files.forEach(file => {
        this.deleteDuplicateImage(file.url);
      });

    }

    
    
    this.deleteDuplicateImage(courseImage);
  }







  // Functions to handle files updates

  getFiles(){
    return this.files;
  }

  setFiles(docId:string, file:File){
   const dbRef = this.afs.collection("courses").doc(docId).update({
     files: firebase.arrayUnion(file)
   })
  }

  async updateFiles(docId:string, newname:string, file:ProgrammeFiles, oldFile: ProgrammeFiles){

    const dbRef = await this.afs.collection("courses").doc(docId);

   await  dbRef.update({
        files: firebase.arrayRemove({
          course: oldFile.course,
          id: oldFile.id,
          preview: oldFile.preview,
          size: oldFile.size,
          title: oldFile.title,
          type: oldFile.type,
          url: oldFile.url,

        })
      }).then( (adat:any)=>{
        file.title = newname;
        dbRef.update({
          files: firebase.arrayUnion(file)
        })
      })
  }

 async deleteFiles(docId: string, file: ProgrammeFiles){
    const dbRef = await this.afs.collection("courses").doc(docId);
    dbRef.update({
      files: firebase.arrayRemove({
        course: file.course,
        id: file.id,
        preview: file.preview,
        size: file.size,
        title: file.title,
        type: file.type,
        url: file.url,

      })
    }).then(async (data: any) => {
      await this.deleteDuplicateImage(file.url);
    })
  }




getColors(){
  return this.colorPallet;
}
setColor(color:string){
  this.colorPallet.push(color)
}





  level: string="";
  semester: string=""
  prog: string = ""

filterCourses(level:string, semester:string, prog:string){
  this.level = level, this.semester = semester;
  this.prog = prog;
}
getFilteredCourses(){
  return this.afs.collection('courses', ref =>
    ref.where("level", "==", this.level).where("semester", "==", this.semester).where("programmes", "array-contains", this.prog)
  ).snapshotChanges();
}






  async deleteDuplicateImage(imgPath:string) {
    //console.log(imgPath)
    const storage = this.afStore
    const storageRef = await storage.refFromURL(imgPath);
    storageRef.delete().subscribe(() => {
      //console.log('Item deleted');
    })
  }


}


