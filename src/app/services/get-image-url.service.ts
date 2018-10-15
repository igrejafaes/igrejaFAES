import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetImageUrlService {

  constructor(private storage: AngularFireStorage) { }

  public getImageURL(imageName: string): Observable<string> {
    const ref: AngularFireStorageReference = this.storage.ref('images/' + imageName);
    return ref.getDownloadURL().pipe(take(1))
  }

}
