import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

  list: Usuario[];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.userService.getUsuarios().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Usuario;
      })
    });

  }

  headElements = ['Nome', 'Email', 'Telefone', 'Wathsapp', ''];
  
  onEdit(usuario: Usuario) {
    this.router.navigate(['usuario/editar', usuario.id], { relativeTo: this.route.parent });
  }

}
