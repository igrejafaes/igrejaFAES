import { AlertModalService } from "./../../../shared/alert-modal.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Carousel } from "src/app/models/clCarousel";
import { Upload } from "src/app/models/clUpload";
import { UploadService } from "src/app/services/upload.service";

@Component({
  selector: "app-carousel-form-modal",
  templateUrl: "./carousel-form-modal.component.html",
  styleUrls: ["./carousel-form-modal.component.scss"]
})
export class CarouselFormModalComponent implements OnInit {

  @ViewChild("preview") preview: ElementRef;
  heading: string;
  carouselForm: FormGroup;
  submited: boolean = false;
  carouselData: Subject<Carousel> = new Subject();
  carousel: Carousel = new Carousel();

  constructor(
    public modalRef: MDBModalRef,
    private formbuilder: FormBuilder,
    private upSvc: UploadService,
    private alert: AlertModalService
  ) {}

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
      carrouselData: [carousel.carrouselData || new Date().toDateString()],
      linkURL: [carousel.linkURL],
      slideIndex: [carousel.slideIndex || 1]
    });
    // disable imageURL
    this.carouselForm.controls["imageURL"].disable();
  }

  // SALVAR IMAGEM
  // **************************************************************************
  onSave() {
    // check image file
    if (this.selectedFiles) {
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

  hasError(field: string) {
    // verifica os erros do FormGroup
    const errors = this.carouselForm.get(field).errors;
    if (errors != null) {
      if (errors["required"]) {
        return "necessário preenchimento";
      }
      if (errors["email"]) {
        return "email inválido";
      }
      if (errors["maxlength"]) {
        return `máximo de ${errors.maxlength.requiredLength} caracteres`;
      }
      if (errors["minlength"]) {
        return `dever ter no mínimo ${
          errors.minlength.requiredLength
        } caracteres`;
      }
    }
  }

  // TRATAMENTO DA IMAGEM
  // ********************************************************************************************
  selectedFiles: FileList;
  currentUpload: Upload;

  // UPLOAD OF IMAGE
  uploadImage() {
    // if exist old image delete
    if (this.carousel.imageName) {
      this.upSvc
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
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file, "carousel");

    this.upSvc.uploadFile(this.currentUpload).then(
      url => {
        this.carouselForm.controls["imageName"].setValue(file.name);
        this.carouselForm.controls["imageURL"].setValue(url);
        this.carousel.imageName = file.name;
        this.carousel.imageURL = url;
        this.selectedFiles = null;
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
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.preview.nativeElement.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
