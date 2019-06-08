import { Carousel } from './../models/clCarousel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  carouselCollection: AngularFirestoreCollection<Carousel>;

  constructor(private db: AngularFirestore) { }

  // GET LIST OF CAROUSEL
  //****************************************************************************** */
  carouselSnapshot(): Observable<any> {
    // REFERENCE & ORDERBY
    this.carouselCollection = this.db.collection('carousel', ref => {
      return ref.orderBy('slideIndex')
    });
    // OBSERVABLE
    const carousel$ = this.carouselCollection.snapshotChanges();
    // RETURN
    return carousel$.pipe(take(1)) as Observable<Carousel[]>
  }

  getCarouselList(): Promise<Carousel[]> {
    return new Promise((resolve, reject) => {
      // OBSERVABLE
      this.carouselSnapshot()
        .subscribe(actionArray => {
          resolve(actionArray.map(item => {
            return {
              ...item.payload.doc.data(),
              id: item.payload.doc.id
            } as Carousel;
          }))
        }, error => {
          reject(error)
        });
    })
  }

  // CREATE NEW CAROUSEL ITEM
  //****************************************************************************** */
  addNewCarousel(carousel: Carousel): any {

    const carouselWithoutID = { ...carousel } // create a new object
    delete carouselWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.carouselCollection.add(carouselWithoutID as Carousel)
        .then(
          (docRef) => resolve(docRef.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }

  // UPDATE CAROUSEL ITEM
  // ****************************************************************************** */
  updateCarousel(carousel: Carousel): any {
    const carouselWithoutID = { ...carousel } // create a new object
    delete carouselWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.carouselCollection.doc<Carousel>(carousel.id).set(carouselWithoutID)
        .then(
          () => resolve(carousel.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }

  // DELETE CAROUSEL ITEM
  // ****************************************************************************** */
  deleteCarousel(id: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.carouselCollection.doc<Carousel>(id)
      .delete()
      .then(() => {
         resolve(true)
      }, (err) => reject(err))
      .catch((reason)=> reject(reason))
    })
  }

}
