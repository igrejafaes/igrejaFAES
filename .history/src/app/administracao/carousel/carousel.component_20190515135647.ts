import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  selectedFile: File = null;

  imagename: string = null;

  imagepath: any = [];

  constructor(private alertModal: AlertModalService) { }

  ngOnInit() {
  }

  onSelectedFile(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.imagename = this.selectedFile.name;
  }

  addUrl() {
    if (this.selectedFile !== null) {
      this.imagepath.push(
        {
          name: this.selectedFile.name,
          url: this.selectedFile,
        }
      );
      this.selectedFile = null;
      this.imagename = null;
    } else {
      this.alertModal.showAlertSuccess('Favor selecionar uma imagem.', 'Atenção!');
    }
  }

  trashUrl(i: number) {
    this.imagepath.splice(i, 1);
  }

  submitUrl() {
    console.log(this.imagepath);
    this.imagepath = [];
    this.alertModal.showAlertSuccess('Carroussel atualizado com sucesso.', 'Atenção!');
  }

  cancelUrl() {
    if (this.imagepath.length > 0) {
      this.imagepath = [];
    } else {
      this.alertModal.showAlertSuccess('Não existem imagens na lista.', 'Atenção!');
    }
  }

}
