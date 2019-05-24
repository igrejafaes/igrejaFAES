import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
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
      this.usuarios.add(usuario)
        .then(
          (docRef) => resolve(docRef.id), 
          (err) => reject(err))
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
  deleteUsuaruiByID(id: string) {}

}
