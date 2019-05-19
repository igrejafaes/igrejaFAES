import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import * as firebase from 'firebase/app';
import { AngularFirestoreCollection, AngularFirestore, CollectionReference } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usuarios: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore) { 
    this.usuarios = this.db.collection<Usuario>('/usuarios');
  }

  // CREATE NEW FIREBASE USER
  createNewUser(usuario: Usuario): any {
    const result$ = firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)

    return result$
    .then(
      (resp) => {
        //usuario.id = resp.user.uid;
        return this.usuarios.doc<Usuario>(usuario.id).set(usuario)
        .then(
          () => usuario
        , err => null)
      }
      , err => null
    )
    .catch(() => null)
  }

  // GET LIST OF USERS
  getUsuarios(){
    return this.db.collection('usuarios').snapshotChanges().pipe(take(1));
  }

  loadByID(id: string): Observable<any>{
    return this.db.collection('usuarios').doc(id).valueChanges().pipe(take(1))
  }

}
