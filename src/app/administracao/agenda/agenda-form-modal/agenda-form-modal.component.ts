import { OptionModalService } from './../../../shared/option-modal.service';
import { clAgenda } from './../../../models/clAgenda';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';
import { UploadService } from 'src/app/services/upload.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Upload } from 'src/app/models/clUpload';
import { ImagesDimensions } from 'src/app/models/clImagesDimensions';
import { Filiais } from 'src/app/models/clFiliais';
import { FormInputErrors } from 'src/app/shared/helpers/form-input-errors';

@Component({
  selector: 'app-agenda-form-modal',
  templateUrl: './agenda-form-modal.component.html',
  styleUrls: ['./agenda-form-modal.component.scss']
})
export class AgendaFormModalComponent implements OnInit {

  @ViewChild("preview") preview: ElementRef;
  @ViewChild("ModalBody") modalBody: ElementRef;
  heading: string;
  agendaForm: FormGroup;
  submited: boolean = false;
  agendaDados: Subject<clAgenda> = new Subject();
  agenda: clAgenda = new clAgenda();

  constructor(
    public modalRef: MDBModalRef,
    private formbuilder: FormBuilder,
    private imageService: UploadService,
    private alert: AlertModalService,
    private optionModal: OptionModalService
  ) { }

  ngOnInit() {
    this.createForm(this.agenda);
  }

  // BUILD FORM
  // ***********************************************************************************
  createForm(agenda: clAgenda) {
    this.agendaForm = this.formbuilder.group({
      id: [agenda.id],
      titulo: [
        agenda.titulo,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      descricao: [agenda.descricao],
      imageURL: [agenda.imageURL, [Validators.required]],
      imageName: [agenda.imageName, [Validators.required]],
      agendaData: [
        this.convertToDate(agenda.agendaData),
        [Validators.required]
      ],
      agendaHora: [agenda.agendaHora, [Validators.required]],
      local: [agenda.local],
      filial: [agenda.filial],
    });
    // disable imageURL
    this.agendaForm.controls["imageURL"].disable();
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
        ["A image deve ser enviada antes de salvar"],
        "Imagem"
      );
      return;
    }
    // enable imagemURL to save
    this.agendaForm.controls["imageURL"].enable();
    // check controls values
    this.submited = true;
    // check if is valid
    if (this.agendaForm.valid) {
      this.agendaDados.next(this.agendaForm.value);
      this.modalRef.hide();
    } else {
      const controls = this.agendaForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      if (!controls["imageURL"].value) {
        this.alert.showAlertWarning(["Ainda não há imagem escolhida"], "Imagem");
      }
      // disable imagemURL to not edited
      this.agendaForm.controls["imageURL"].disable();
    }
  }

  hasError(field: string) : string {
    // verifica os erros do FormGroup
    return FormInputErrors(field, this.agendaForm)
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
    const dim = dimension.getDimension('agenda')

    if (dim) {
      if (width != dim.width || height != dim.height) {
        this.alert.showAlertInfo(
          [`A imagem escolhida não possui as dimensões necessárias:`,
          `largura: ${dim.width}, altura: ${dim.height}`],
          'Imagem'
        );
        return;
      }
    }

    // if exist old image delete
    if (this.agenda.imageName) {
      this.imageService
        .deleteUpload(this.agenda.imageName, 'agenda')
        .catch(err => {
          if (err.code !== "storage/object-not-found") {
            this.alert.showAlertDanger(
              ["Não foi possível realizar a troca de imagem..."],
              "Imagem"
            );
            console.log(err);
            return;
          }
        });
    }

    // upload image
    this.currentUpload = new Upload(this.selectedFile, 'agenda');

    this.imageService.uploadFile(this.currentUpload).then(
      url => {
        this.scrollToBottom(); // to see progress bar
        this.agendaForm.controls['imageName'].setValue(this.selectedFile.name);
        this.agendaForm.controls['imageURL'].setValue(url);
        this.agenda.imageName = this.selectedFile.name;
        this.agenda.imageURL = url;
        this.selectedFile = null;
      },
      err => {
        this.alert.showAlertDanger(
          ["Não foi possível enviar a imagem..."],
          "Imagem"
        );
        console.log(err);
      }
    );
  }

  // PREVIEW OF NEW IMAGE
  //************************************************************************************* */
  loadFileImage(event) {

    const file = event.target.files && event.target.files[0];
    if (!file) { return };

    // check file type
    if (!(file.type == 'image/jpeg' || file.type == 'image/png')) {
      console.log(file.type);
      this.alert.showAlertInfo(
        ["A imagem escolhida não é JPEG ou PNG..."],
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

  // ESCOLHER A FILIAL OPEN DIALOG
  //************************************************************************ */
  dialogOpen: boolean = false
  @ViewChild('filialControl') filialControl : ElementRef

  // control keycode
  openOptionFilial(e){
    if(e.keyCode !== 107) {
      e.preventDefault()
    } else {
      this.getOptionFilial();
      e.preventDefault();
    }
  }

  getOptionFilial(){
    if(!this.dialogOpen){
      // get filiais
      const filiais = new Filiais
      const filiaisNames = filiais.getFiliaisName()
      // open dialog
      this.dialogOpen = true;
      this.optionModal.showOptions('Escolha uma Filial', filiaisNames)
      .subscribe((value)=>{
        if(value != null){
          const filial = filiaisNames[value];
          this.agenda.filial = filial;
          this.agendaForm.controls['filial'].setValue(filial)
        };
        // on close dialog focus control
        this.dialogOpen = false;
        this.filialControl.nativeElement.focus();
      });
    }
  }

}
