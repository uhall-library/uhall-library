
import { DataflowService } from './../../services/dataflow.service';
import { Component, OnInit,  Input } from '@angular/core';
import { documentId } from 'firebase/firestore/dist/firestore';

@Component({
  selector: 'books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.scss']
})
export class BooksViewComponent implements OnInit {

 selectedBook: any;
 title:string = "";
 rename:string = ""
 showpop:boolean = false;
 showpop2:boolean = false;
  constructor(private dataService: DataflowService) { }
  @Input() data: any;
  @Input() bookId: any;
  ngOnInit(): void {
  }





  modelDisplay(book:any){
    this.title = book.title;
    this.selectedBook = book;
    const popUpModel = document.getElementById("popup-model");
    popUpModel?.classList.add('display');
    popUpModel?.classList.remove('hidemodel');

   const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.setAttribute("display","block")
      darkbg.classList.add("activeRequest")
    }
  }

  modelDismiss() {
    const popUpModel = document.getElementById("popup-model");
   // popUpModel?.classList.remove('display')
    popUpModel?.classList.add('hidemodel');
    
  }

  renameFile(){
    this.modelDismiss()
    this.rename = this.title
    this.showpop = true;
  }

  renameFiles(){
    let file: any = ""

    this.data.forEach((book: any) => {
      if (book.url == this.selectedBook.url) file = book;
    });

    if(this.rename.length != 0){
   
       this.dataService.updateFiles(this.bookId, this.rename, file, this.selectedBook)

    }
   this.showpop = false;
  }
  cancelRename(){
   this.showpop= false;
    this.showpop2 = false;
  }


  confirmDelete(){
    this.showpop2 = true;
        this.modelDismiss()
  }

  deleteBook(bookurl: any, id = this.bookId){

    this.showpop2 = false;
    let file:any = ""
    let newData:any = [];
    this.data.forEach((book:any) => {
      if(book.url == bookurl.url) file = book;
    });

 
   if(file.url){
  
     this.dataService.deleteFiles(id, file).then( (data:any)=>{
       this.data.forEach((book: any) => {
         if (book.title != bookurl.title){ newData.push(book)};
       });
       this.data = newData;
     })

 
     
   }
  }


  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
