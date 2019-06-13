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
    private imageService: UploadService
  ) { }

  ngOnInit() {
    this.noticiaService.getNoticiasSnapshot().subscribe(actionArray => {
      this.list = actionArray.map(item => {

        //
        console.log(item.payload.doc.data())
        //

        
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        } as Noticia;
      })
    });
  }

  openAddNoticiaModal(){
    // this.modalRef = this.modalService.show(AgendaFormModalComponent, this.modalConfig());

    // this.modalRef.content.agendaDados.pipe(take(1)).subscribe((agendaDados: clAgenda) => {
    //   this.agendaService.addNewAgenda(agendaDados)
    //     .then((id) => {
    //       agendaDados.id = id;
    //       this.list.unshift(agendaDados);
    //       this.alertModal.showAlertSuccess('Evento salvo com sucesso', 'Sucesso');
    //     }, () => {
    //       this.alertModal.showAlertDanger('Não foi possível salvar o Evento', 'Tente depois');
    //     })
    // });
  }

  onEdit(noticia: Noticia){
    // const agendaCopy = { ...agenda };

    // this.modalRef = this.modalService.show(
    //   AgendaFormModalComponent,
    //   this.modalConfig(agendaCopy)
    // );

    // this.modalRef.content.agendaDados.pipe(take(1)).subscribe((agendaDados: clAgenda) => {

    //   this.agendaService.updateAgenda(agendaDados)
    //     .then(() => {
    //       const i = this.list.findIndex((u) => u.id === agendaDados.id)
    //       this.list[i] = agendaDados
    //       this.alertModal.showAlertSuccess('Evento atualizado com sucesso', 'Sucesso');
    //     }, () => {
    //       this.alertModal.showAlertDanger('Não foi possível atualizar Evento', 'Tente depois');
    //     })
    // });
  }

  onDelete(noticia: Noticia){
    this.confirmModal.showConfirmDanger('Deseja EXCLUIR o Evento?', 'Sim', 'Não')
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

        // delete carousel
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
