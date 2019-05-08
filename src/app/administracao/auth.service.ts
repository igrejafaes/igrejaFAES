import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs/Subject';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _usuarioAutenticado: Usuario = null;
  // mostrarMenuEmitter = new EventEmitter<boolean>();

  // public get usuarioAutenticado() : Usuario  {
  //   return this._usuarioAutenticado
  // }
 
  constructor(private afAuth: AngularFireAuth) { }

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
      var user = firebase.auth().onAuthStateChanged((user)=>{
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

}
