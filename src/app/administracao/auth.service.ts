import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs/Subject';
import { AngularFirestoreCollection, AngularFirestore, CollectionReference } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: AngularFirestoreCollection<Usuario>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore) {
      this.usuarios = this.db.collection<Usuario>('/usuarios');
      //(ref: CollectionReference) => ref.orderBy('feito', 'asc').orderBy('titulo', 'asc'));
  }

  doLogin(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          //console.log(usuario)
          this.emitChange(usuario.email);
          resolve(res);
        }, err => {
          //this._usuarioAutenticado = null
          reject(err);
        })
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        //this._usuarioAutenticado = null
        this.emitChange(null)
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise<Usuario>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const U: Usuario = { nome: '', password: '', email: user.email, acesso: 1 }
          resolve(U);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  // VERIFICA A SENHA ATUAL DO CURRENT USER
  verificaUsuarioSenha(currentUserEmail: string, oldPass: string): Promise<any> {
    //verifica a senha antiga
    return firebase.auth().signInWithEmailAndPassword(currentUserEmail, oldPass)
      .then(
        dados => {
          if (dados) {
            return { resultado: true, motivo: '' }
          }
        }, err => {
          if (err.code === 'auth/wrong-password') {
            return { resultado: false, motivo: 'senha errada' }
          }
        }
      )
  }

  // Observable string sources
  private usuarioChangeSource = new Subject<string>();

  // Observable string streams
  usuarioChange$ = this.usuarioChangeSource.asObservable();

  // Service message commands
  emitChange(user: string) {
    this.usuarioChangeSource.next(user);
  }

  // CREATE NEW FIREBASE USER
  createNewUser(usuario: Usuario): any {
    const result$ = firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)

    return result$
    .then(
      (resp) => {
        usuario.uid = resp.user.uid;
        return this.usuarios.doc<Usuario>(usuario.uid).set(usuario)
        .then(
          () => usuario
        , err => null)
      }
      , err => null
    )
    .catch(() => null)
  }

  writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

}
