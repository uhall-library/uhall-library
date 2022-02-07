import { DataflowService } from './../../services/dataflow.service';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() file!: File;
  @Input() docId: string = "";
  @Input() path: string = "";
  @Input() fileItem:any;

  

  constructor(private dataService: DataflowService, private afStorage: AngularFireStorage) { }
 

  

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<any>;
  downloadURL: any = "";
  
  ngOnInit(): void {
   
    this.uploadCourse();
  }


  uploadCourse() {
      const file = this.file;
      const path = `/${this.path}/${Date.now()}_${file.name}`;
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
      this.uploadProgress
      // get notified when the download URL is available
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe((filepath: any) => {
            this.fileItem.url = filepath;
            this.dataService.uploadedFiles.push(filepath);
            this.dataService.uploadCounter.next(this.dataService.uploadedFiles.length)
           this.dataService.setFiles(this.docId, this.fileItem)
          })

        })
      )
        .subscribe();
    } 

  












}
