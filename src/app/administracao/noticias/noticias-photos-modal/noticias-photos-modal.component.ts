import { OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-noticias-photos-modal',
  templateUrl: './noticias-photos-modal.component.html',
  styleUrls: ['./noticias-photos-modal.component.scss']
})
export class NoticiasPhotosModalComponent implements OnInit, OnDestroy {
  
  noticiaData: Subject<any> = new Subject();
  noticiaID: string;
  noticiaFotos: [];
  novasFotos: any[] = [];
  task: AngularFireUploadTask;  // Main task 
  percentage: Observable<number>; // Progress monitoring
  snapshot: Observable<any>;
  downloadURL: Observable<string>; // Download URL
  isHovering: boolean; // State for dropzone CSS toggling

  @ViewChild("content", {static: false}) content: ElementRef; // To scroll down
  @ViewChild("previewContainer", {static: false}) previewContainer: ElementRef;

  constructor(
    public modalRef: MDBModalRef, 
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private alert: AlertModalService,
  ) { }

  ngOnInit() {
  }

  onSave(){
  }

 
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  /* UPLOAD FILES IMAGES */
  startUpload(event: FileList) {

    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `noticia/${this.noticiaID}/${file.name}`;
    const ref = this.storage.ref(path)
    
    // Totally optional metadata
    const customMetadata = { origem: 'noticia', id: this.noticiaID};

    // The main task
    this.task = ref.put(file, { customMetadata })
    //this.task = this.storage.upload(path, file, { customMetadata })

    this.task.then(()=> {
      // The file's download URL
      this.downloadURL = ref.getDownloadURL();
      // Update firestore on completion
      this.downloadURL.pipe(take(1)).subscribe((URL) => {
        this.db.collection(`noticia/${this.noticiaID}/fotos`).add( { path, URL, size: file.size })
      })
    })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    
    this.snapshot = this.task.snapshotChanges()
    // this.snapshot = this.task.snapshotChanges().pipe(
    //   tap(snap => {
    //     if (snap.bytesTransferred === snap.totalBytes) {
    //       console.log(snap.ref)
    //     }
    //   })
    // )
    
  }

  previewImages(event: FileList){

    let files: File[] = Array.from(event)
    let noImages: boolean = false
    
    files.filter((file)=>{
      if (file.type == 'image/jpeg' || file.type == 'image/png'){
        return file
      } else {
        noImages = true
      }
    }).forEach((image) => {

      this.novasFotos.push(image);
  
      let newImage = document.createElement('img');
      newImage.alt = 'nova Imagem'
      newImage.id = image.name
      newImage.width = 150;

      this.previewContainer.nativeElement.appendChild(newImage)
      
      const foto = document.getElementById(image.name);
      const reader = new FileReader();
      reader.onload = () => {
         foto['src'] = reader.result;
      };
      reader.readAsDataURL(image);
    })

    //files.forEach((file)=>{

      // check file type
      // if (!(file.type == 'image/jpeg' || file.type == 'image/png')) {
      //   console.log(file.type);
      //   this.alert.showAlertInfo(
      //     ["A imagem escolhida não é JPEG ou PNG..."],
      //     "Imagem"
      //   );
      //   return;
      // };



    //})

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  // SCROLL TO BOTTOM
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.content.nativeElement.scrollIntoView()
      }, 500);
    } catch (err) {
      console.log(err)
    }
  }

}
