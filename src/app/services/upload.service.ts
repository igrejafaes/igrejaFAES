import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Upload } from '../models/clUpload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFirestore) { }

  // Upload File return URL
  // *****************************************************************************************
  uploadFile(upload: Upload): Promise<string> {

    const file = upload.file;
    const folder = upload.storageFolder ? upload.storageFolder : 'images';
    const storageFolder = `/${folder}/${file.name}`;
    
    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    let storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(storageFolder).put(file, metadata);

    return new Promise<string> ((resolve, reject) => {

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              //console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              //console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.name) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('storage não autorizado');
              break;
            case 'storage/canceled':
              // User canceled the upload
              console.log('upload cancelado');
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('erro desconhecido: storage/unknown');
              break;
            default:
              console.log('erro desconhecido');
              break;
          };
          reject(error.name);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            // upload success
            upload.url = downloadURL
            resolve(downloadURL)
          });
        }
      );
    })
  }

 // DELETE
 // *****************************************************************************************
  deleteUpload(name: string, storageFolder: string): Promise<boolean> {
    let storageRef = firebase.storage().ref();

    return new Promise((resolve, reject) => {
      storageRef.child(`${storageFolder}/${name}`).delete()
        .then(()=> resolve(true), (error) => {
          reject(error)
        })
    });
    
  }

}
