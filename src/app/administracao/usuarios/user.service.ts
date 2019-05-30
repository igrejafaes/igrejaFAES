import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/clUsuario";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "angularfire2/firestore";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  usuarios: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.usuarios = this.db.collection<Usuario>("/usuarios");
  }

  // CREATE NEW USUARIO
  addNewUsuario(usuario: Usuario): any {
    return new Promise((resolve, reject) => {
      const usuarioWithoutID = { ...usuario } // create a new object
      delete usuarioWithoutID.id // to save without ID
      this.usuarios.add(usuarioWithoutID)
        .then(
          (docRef) => resolve(docRef.id), 
          (err) => reject(err))
    });
  }

  // UPDATE USUARIO
  updateUsuario(usuario: Usuario){
    const usuarioWithoutID = { ...usuario } // create a new object
    delete usuarioWithoutID.id // to save without ID
    return new Promise((resolve, reject) => {
      this.usuarios.doc<Usuario>(usuario.id).set(usuarioWithoutID)
        .then(
          () => resolve(), 
          (err) => reject(err))
        .catch((reason) => {
          reject(reason)
        })
    }) 
  }

  // GET LIST OF USUARIOS
  getUsuarios() {
    return this.db
      .collection("usuarios")
      .snapshotChanges()
      .pipe(take(1));
  }

  // GET USUARIO BY ID
  loadByID(id: string): Observable<Usuario> {
    return this.db
      .collection("usuarios")
      .doc<Usuario>(id)
      .valueChanges()
      .pipe(take(1));
  }

  // DELETE USUARIO BY ID
  deleteUsuaruiByID(id: string) {
    return new Promise((resolve, reject) => {
      this.usuarios.doc<Usuario>(id).delete()
        .then(
          () => resolve(), 
          (err) => reject(err))
        .catch((reason) => {
          reject(reason)
        })
    }) 
  }

}
