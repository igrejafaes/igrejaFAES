import { ImagesDimensions } from './../../../models/clImagesDimensions';
import { AlertModalService } from "./../../../shared/alert-modal.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Carousel } from "src/app/models/clCarousel";
import { Upload } from "src/app/models/clUpload";
import { UploadService } from "src/app/services/upload.service";
import { FormInputErrors } from 'src/app/shared/helpers/form-input-errors';

@Component({
  selector: "app-carousel-form-modal",
  templateUrl: "./carousel-form-modal.component.html",
  styleUrls: ["./carousel-form-modal.component.scss"]
})
export class CarouselFormModalComponent implements OnInit {

  @ViewChild("preview") preview: ElementRef;
  @ViewChild("ModalBody") modalBody: ElementRef;
  heading: string;
  carouselForm: FormGroup;
  submited: boolean = false;
  carouselData: Subject<Carousel> = new Subject();
  carousel: Carousel = new Carousel();

  constructor(
    public modalRef: MDBModalRef,
    private formbuilder: FormBuilder,
    private imageService: UploadService,
    private alert: AlertModalService
  ) { }

  ngOnInit() {
    this.createForm(this.carousel);
  }

  // BUILD FORM
  // ***********************************************************************************
  createForm(carousel: Carousel) {
    this.carouselForm = this.formbuilder.group({
      id: [carousel.id],
      titulo: [
        carousel.titulo,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      descricao: [carousel.descricao],
      imageURL: [carousel.imageURL, [Validators.required]],
      imageName: [carousel.imageName, [Validators.required]],
      carrouselData: [
        this.convertToDate(carousel.carrouselData),
        [Validators.required]
      ],
      linkURL: [carousel.linkURL],
      slideIndex: [carousel.slideIndex || 1]
    });
    // disable imageURL
    this.carouselForm.controls["imageURL"].disable();
  }

  convertToDate(dateString: string) {
    if (!dateString || !dateString.length) {
      dateString = new Date().toLocaleDateString()
    }
    dateString.split('/').reverse().join('-')
    const myDate = dateString.split('/').reverse().join('-')
    return myDate
  }

  // SALVAR IMAGEM
  // **************************************************************************
  onSave() {
    // check image file
    if (this.selectedFile) {
      this.alert.showAlertWarning(
        "A image deve ser enviada antes de salvar",
        "Imagem"
      );
      return;
    }
    // enable imagemURL to save
    this.carouselForm.controls["imageURL"].enable();
    // check controls values
    this.submited = true;
    // check if is valid
    if (this.carouselForm.valid) {
      this.carouselData.next(this.carouselForm.value);
      this.modalRef.hide();
    } else {
      const controls = this.carouselForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      if (!controls["imageURL"].value) {
        this.alert.showAlertWarning("Ainda não há imagem escolhida", "Imagem");
      }
      // disable imagemURL to not edited
      this.carouselForm.controls["imageURL"].disable();
    }
  }

  hasError(field: string) : string {
    // verifica os erros do FormGroup
    return FormInputErrors(field, this.carouselForm)
  }

  // TRATAMENTO DA IMAGEM
  // ********************************************************************************************
  selectedFile: File;
  currentUpload: Upload;

  // UPLOAD OF IMAGE
  uploadImage() {

    // check file dimension (width, height)
    const width = this.preview.nativeElement.naturalWidth
    const height = this.preview.nativeElement.naturalHeight
    const dimension = new ImagesDimensions
    const dim = dimension.getDimension('carousel')

    if (dim) {
      if (width != dim.width || height != dim.height) {
        this.alert.showAlertInfo(
          `A imagem escolhida não possui as dimensões necessárias:
          largura: ${dim.width}, altura: ${dim.height}`,
          'Imagem'
        );
        return;
      }
    }

    // if exist old image delete
    if (this.carousel.imageName) {
      this.imageService
        .deleteUpload(this.carousel.imageName, "carousel")
        .catch(err => {
          if (err.code !== "storage/object-not-found") {
            this.alert.showAlertDanger(
              "Não foi possível realizar a troca de imagem...",
              "Imagem"
            );
            console.log(err);
            return;
          }
        });
    }

    // upload image
    this.currentUpload = new Upload(this.selectedFile, "carousel");

    this.imageService.uploadFile(this.currentUpload).then(
      url => {
        this.scrollToBottom(); // to see progress bar
        this.carouselForm.controls["imageName"].setValue(this.selectedFile.name);
        this.carouselForm.controls["imageURL"].setValue(url);
        this.carousel.imageName = this.selectedFile.name;
        this.carousel.imageURL = url;
        this.selectedFile = null;
      },
      err => {
        this.alert.showAlertDanger(
          "Não foi possível enviar a imagem...",
          "Imagem"
        );
        console.log(err);
      }
    );
  }

  // PREVIEW OF NEW IMAGE
  loadFileImage(event) {

    const file = event.target.files && event.target.files[0];
    if (!file) { return };

    // check file type
    if (!(file.type == 'image/jpeg' || file.type == 'image/png')) {
      console.log(file.type);
      this.alert.showAlertInfo(
        "A imagem escolhida não é JPEG ou PNG...",
        "Imagem"
      );
      return;
    };

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.preview.nativeElement.src = reader.result;
    };
    reader.readAsDataURL(file);
    this.scrollToBottom(); // to see new image

  }

  // SCROLL TO BOTTOM
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.modalBody.nativeElement.scrollTop = this.modalBody.nativeElement.scrollHeight;
      }, 500);
    } catch (err) {
      console.log(err)
    }
  }

}
