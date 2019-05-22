import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: any = [];

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
  }

  ngOnInit() {
  }
}
