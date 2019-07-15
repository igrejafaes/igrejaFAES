import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetImageUrlService {

  constructor(private storage: AngularFireStorage) { }

  public getImageURL(imageName: string, imageFolder: string): Observable<string> {

    const path: string = `images/${imageFolder}/${imageName}`
    const ref: AngularFireStorageReference = this.storage.ref(path);

    return ref.getDownloadURL().pipe(take(1));
  }

  public getImageToPath(path: string): Observable<string> {
    const ref: AngularFireStorageReference = this.storage.ref(path);
    return ref.getDownloadURL().pipe(take(1));
  }

}
