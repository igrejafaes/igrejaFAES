import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs/Subject';
import { UsuarioLogadoService } from './usuarioLogado.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedAnonymously: boolean = false
  constructor(private afAuth: AngularFireAuth,
              private userLogadoService: UsuarioLogadoService) { }

  doLogin(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          this.emitChange(usuario.email);
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  // DO USER LOGIN
  doUserLogin(userName, password): Promise<Usuario> {

    return new Promise((resolve, reject) => {
      firebase.firestore().collection('usuarios')
        .where('nome', '==', userName)
        .where('password', '==', password)
        .get()
        .then(querySnapshot => {
          if(!querySnapshot.empty) {
            let user = querySnapshot.docs[0];
            this.emitChange(user.data().nome);

            //
            this.userLogadoService.usuarioLogado = { id: user.id, ...user.data() } as Usuario
            //

            resolve( { id: user.id, ...user.data() } as Usuario)
          } else {
            reject("Usuário ou Senha inválidos");
          }
        }).catch(() => "Não possível consultar o BD...");

    })
  }

  doAnonymousLogin(){
    return new Promise((resolve, reject) => {
      firebase.auth().signInAnonymously().then(
        res => {
          this.loggedAnonymously = true;
          resolve(res);
        }
      ).catch(err => {
        this.loggedAnonymously = false;
        reject(err);
      })
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.emitChange(null)
        resolve();
      } else {
        reject();
      }
    });
  }

  isAnonymouslyLogged() {
    return new Promise<boolean>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        if( firebase.auth().currentUser.isAnonymous ){
          resolve(true)
        } else {
          resolve(false)
        }
      }
      else {
        resolve(false)
      }
    })
  }

  getCurrentAuthUser() {
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

  // CREATE NEW FIREBASE USER
  createNewUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
  }

  // Observable string sources
  private usuarioChangeSource = new Subject<string>();

  // Observable string streams
  usuarioChange$ = this.usuarioChangeSource.asObservable();

  // Service message commands
  emitChange(usuarioNome: string) {
    this.usuarioChangeSource.next(usuarioNome);
  }

  // writeUserData(userId, name, email, imageUrl) {
  //   firebase.database().ref('users/' + userId).set({
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }

}
