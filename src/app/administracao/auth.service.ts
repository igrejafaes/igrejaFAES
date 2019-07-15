import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/clUsuario';
import { Subject } from 'rxjs/Subject';
import { UsuarioLogadoService } from './usuarioLogado.service';
import { AppError } from '../shared/app-errors/app-error';
import { take } from 'rxjs/operators';
import { LoginErros, loginErrorCodes } from './../shared/app-errors/login-errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedAnonymously: boolean = false

  // Observable string sources
  private usuarioChangeSource = new Subject<string>();

  // Observable string streams
  usuarioChange$ = this.usuarioChangeSource.asObservable();

  // Service EMIT CHANGE USUARIO
  emitChange(usuarioNome: string) {
    this.usuarioChangeSource.next(usuarioNome);
  }

  constructor(private afAuth: AngularFireAuth,
              private userLogadoService: UsuarioLogadoService) { }

  // DO USUARIO LOGIN: 1-LOGIN FIREBASE | 2-CHECK USUARIO
  /************************************************************************ */
  doUsuarioLogin(email: string, password: string): Promise<Usuario> {

    return new Promise<any>((resolve, reject) => {
      this.doFirebaseLogin(email, password)
      .then(()=>{
        this.verifyUsuarioLogin(email)
        .then((usuario: Usuario)=>{
          this.emitChange(usuario.nome);
          this.userLogadoService.usuarioLogado = usuario;
          resolve(usuario);
        }, (err)=>{
          reject(err)
        })
        .catch((err)=>{
          reject(err)
        })

      }, (err)=>reject(err))
      .catch((reject)=>reject(reject))
    })

  }

  // DO LOGIN WITH EMAIL AND PASSWORD
  doFirebaseLogin(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => {
          if (err.code === 'auth/user-not-found') {
            reject(new LoginErros(loginErrorCodes.usuario_senha_invalidos));
          } else {
            reject(new AppError(err))
          }
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  // USUARIO LOGIN
  verifyUsuarioLogin(email: string): Promise<Usuario> {
    
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('usuarios')
        .where('email', '==', email)
        .get()
        .then((querySnapshot)=>{

          // check if return empty
          if(querySnapshot.empty) { 
            reject(new LoginErros(loginErrorCodes.usuario_incompleto)); 
          }
          
          let userData = querySnapshot.docs[0];
          const usuario: Usuario = { id: userData.id, ...userData.data() } as Usuario
          
          // check if usuario is Active
          if(!usuario.ativo){
            this.doLogout().then();
            reject(new LoginErros(loginErrorCodes.usuario_inativo)); 
          }

          // resolve
          resolve( usuario )

        })
        .catch((error) => {
          if (error.code === 'permission-denied') {
            reject(new LoginErros(loginErrorCodes.permissao_negada));
          } else {
            reject(new AppError(error))
          }
        });
    })

  }
  /************************************************************************ */
 // USER LOGOUT
  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        .then(() => {
          this.emitChange(null)
          resolve();
        })
      } else {
        reject();
      }
    });
  }

  // GET LOGGED USER
  getCurrentAuthUser(): Promise<Usuario> {

    return new Promise<Usuario>((resolve, reject) => {

      this.afAuth.authState
      .pipe(take(1))
      .subscribe((user)=>{
        if (user) {

          this.verifyUsuarioLogin(user.email)
          .then((usuario: Usuario)=>{
            this.emitChange(usuario.nome);
            this.userLogadoService.usuarioLogado = usuario;
            resolve(usuario);
          }, (err)=>{
            reject(err)
          })
          .catch((err)=>{
            reject(err)
          })

        } else {
          reject(new LoginErros(loginErrorCodes.nenhum_usuario));
        }
      
      }, (error) =>{
        reject(error);
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

  // UPDATE FIREBASE USER EMAIL
  updateUserEmail(newEmail: string): Promise<any> {
    return firebase.auth().currentUser
      .updateEmail(newEmail)
  }

  // writeUserData(userId, name, email, imageUrl) {
  //   firebase.database().ref('users/' + userId).set({
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }

}
