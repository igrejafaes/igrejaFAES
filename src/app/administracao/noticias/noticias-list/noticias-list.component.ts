import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/clNoticia';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NoticiaService } from 'src/app/services/noticia.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.scss']
})
export class NoticiasListComponent implements OnInit {


  list: Noticia[];
  modalRef: MDBModalRef;

  // ARRAY OF LIST HEAD ELEMENTS
  headElements = ['Título', 'Data', 'Descrição', ''];

  constructor(
    private noticiaService: NoticiaService,
    private modalService: MDBModalService,
    private alertModal: AlertModalService,
    private confirmModal: ConfirmModalService,
    private imageService: UploadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.noticiaService.getNoticiasSnapshot().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        } as Noticia;
      })
    });
  }

  openAddNoticiaModal(){
    this.router.navigate(["/administracao/noticias/inserir"]);
  }

  onEdit(noticia: Noticia){
    this.router.navigate(['/administracao/noticias', noticia.id]);
  }

  onDelete(noticia: Noticia){
    this.confirmModal.showConfirmDanger('Deseja EXCLUIR a Notícia?', 'Sim', 'Não')
    .subscribe((confirmation: boolean) => {
      if(confirmation){

        //delete image
        this.imageService
        .deleteUpload(noticia.imageName, "noticia")
        .catch(err => {
          if (err.code !== "storage/object-not-found") {
            this.alertModal.showAlertDanger("Não foi possível realizar a troca de imagem...", "Imagem");
            console.log(err);
            return;
          }
        });

        // delete noticia
        this.noticiaService.deleteNoticia(noticia.id)
        .then(()=> {
          const i = this.list.findIndex((c) => c.id === noticia.id);
          this.list.splice(i, 1)
        })
      }
    })
  }

  // CONFIG MODAL OF USUARIO
  modalConfig(noticia?: Noticia) {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      animated: true,
      //class: 'modal-notify modal-info modal-dialog-centered modal-md',
      class: 'modal-dialog modal-dialog-scrollable',
      data: {
        heading: noticia ? 'Editar Noticia' : 'Nova Noticia',
        agenda: noticia || new Noticia
      }
    };
  };
}
