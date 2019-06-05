import { CarouselService } from './../../services/carousel.service';
import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/models/clCarousel';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { CarouselFormModalComponent } from './carousel-form-modal/carousel-form-modal.component';
import { take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  listCarousel: Carousel[]
  modalRef: MDBModalRef;

  constructor(
    private service: CarouselService,
    private modalService: MDBModalService,
    private carouselService: CarouselService,
    private alertModal: AlertModalService,
    private confirmModal: ConfirmModalService
  ) { }

  ngOnInit() {
    this.getListCarousel()
  }

  getListCarousel() {
    this.service.getCarouselList().then((resp: Carousel[]) => {
      this.listCarousel = resp;
    })
  }

  openAddCarouselModal() {
    this.modalRef = this.modalService.show(CarouselFormModalComponent, this.modalConfig());

    this.modalRef.content.carouselData.pipe(take(1)).subscribe((carouselData: Carousel) => {
      this.service.addNewCarousel(carouselData)
        .then((id) => {
          carouselData.id = id;
          this.listCarousel.unshift(carouselData);
          this.alertModal.showAlertSuccess('Carrousel salvo com sucesso', 'Sucesso');
        }, () => {
          this.alertModal.showAlertDanger('Não foi possível salvar o Carrousel', 'Tente depois');
        })
    });
  }

  onCarouselDelete(carousel: Carousel) {
    this.confirmModal.showConfirmDanger('Deseja APAGAR o Carrousel?', 'Sim', 'Não')
    .subscribe((confirmation: boolean) => {
      if(confirmation){
        this.service.deleteCarousel(carousel.id)
        .then(()=> {
          const i = this.listCarousel.findIndex((c) => c.id === carousel.id);
          this.listCarousel.splice(i, 1)
        })
      }
    })
  }

  openEditCarouselModal(carousel: Carousel) {
    const carouselCopy = { ...carousel };

    this.modalRef = this.modalService.show(
      CarouselFormModalComponent,
      this.modalConfig(carouselCopy)
    );

    this.modalRef.content.carouselData.pipe(take(1)).subscribe((carouselData: Carousel) => {

      this.carouselService.updateCarousel(carouselData)
        .then(() => {
          const i = this.listCarousel.findIndex((u) => u.id === carouselData.id)
          this.listCarousel[i] = carouselData
          this.alertModal.showAlertSuccess('Carrousel atualizado com sucesso', 'Sucesso');
        }, () => {
          this.alertModal.showAlertDanger('Não foi possível atualizar Carrousel', 'Tente depois');
        })
    });
  }

  // CONFIG MODAL OF USUARIO
  modalConfig(carousel?: Carousel) {
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
        heading: carousel ? 'Editar Item do Carrousel' : 'Novo Item do Carroussel',
        carousel: carousel || new Carousel
      }
    };
  };

}
