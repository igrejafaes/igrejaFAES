import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-noticias-photos-modal',
  templateUrl: './noticias-photos-modal.component.html',
  styleUrls: ['./noticias-photos-modal.component.scss']
})
export class NoticiasPhotosModalComponent implements OnInit, OnDestroy {
  
  noticiaData: Subject<any> = new Subject();
  noticiaID: string;
  task: AngularFireUploadTask;  // Main task 
  percentage: Observable<number>; // Progress monitoring
  snapshot: Observable<any>;
  downloadURL: Observable<string>; // Download URL
  isHovering: boolean; // State for dropzone CSS toggling

  constructor(
    public modalRef: MDBModalRef, 
    private storage: AngularFireStorage, 
    private db: AngularFirestore
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

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

}
