import { CarouselService } from './../../services/carousel.service';
import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/models/clCarousel';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { CarouselFormModalComponent } from './carousel-form-modal/carousel-form-modal.component';
import { take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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
    private alertModal: AlertModalService
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

  onCarouselDelete(e) {

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

  /* images: any = [];
  allFiles: any = [];
  headTable = ['Item', 'Imagem', 'Arquivo', 'Tipo', 'Deletar'];

  constructor(private alertModal: AlertModalService) { }

  fileuploads(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const image = {
          name: '',
          type: '',
          size: '',
          url: '',
        };
        this.allFiles.push(files[i]);
        image.name = files[i].name;
        image.type = files[i].type;
        image.size = files[i].size;
        const reader = new FileReader();
        reader.onload = (_filedata) => {
          image.url = reader.result + '';
          this.images.push(image);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  trashImage(image: any) {
    const i = this.images.indexOf(image);
    this.images.splice(i, 1);
    this.allFiles.splice(i, 1);
  }

  cancelImages() {
    if (this.images.length > 0) {
      this.images = [];
    } else {
      this.alertModal.showAlertSuccess('Não existem imagens na lista.', 'Atenção!');
    }
  }

  submitImages() {
    if (this.allFiles.length > 0) {
      console.log(this.allFiles);
      this.allFiles = [];
      this.alertModal.showAlertSuccess('Carroussel atualizado com sucesso.', 'Atenção!');
    } else {
      this.alertModal.showAlertSuccess('Não houve alguma alteração.', 'Atenção!');
    }
  } */

}
