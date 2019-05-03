import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioAutenticado: boolean = false;
  // mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private afAuth: AngularFireAuth) { }

  doLogin(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          this._usuarioAutenticado = true;
          resolve(res);
        }, err => {
          this._usuarioAutenticado = false;
          reject(err);
        })
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
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

}
