import { NoticiaService } from 'src/app/services/noticia.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/clNoticia';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { OptionModalService } from 'src/app/shared/option-modal.service';
import { FormInputErrors } from 'src/app/shared/helpers/form-input-errors';
import { Filiais } from 'src/app/models/clFiliais';
import { Upload } from 'src/app/models/clUpload';
import { ImagesDimensions } from 'src/app/models/clImagesDimensions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-noticias-form',
  templateUrl: './noticias-form.component.html',
  styleUrls: ['./noticias-form.component.scss']
})
export class NoticiasFormComponent implements OnInit {
  
  noticiaForm: FormGroup;
  submited: boolean = false;
  noticia: Noticia = new Noticia();
  @ViewChild("preview") preview: ElementRef;
  @ViewChild("content") content: ElementRef;

  constructor(
    private formbuilder: FormBuilder,
    private alert: AlertModalService,
    private optionModal: OptionModalService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: UploadService,
    private noticiaService: NoticiaService
  ) { }

  ngOnInit() {
    // get noticia dados
    this.route.data
      .pipe(take(1))
      .subscribe(
        (info: {noticia: Noticia}) => {
          this.noticia = info.noticia;
        }
    );
    // create form
    this.createForm(this.noticia);
  }

  // BUILD FORM
  // ***********************************************************************************
  createForm(noticia: Noticia) {
    this.noticiaForm = this.formbuilder.group({
      id: [noticia.id],
      titulo: [
        noticia.titulo,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      descricao: [noticia.descricao],
      imageURL: [noticia.imageURL, [Validators.required]],
      imageName: [noticia.imageName, [Validators.required]],
      noticiaData: [
        this.convertToDate(noticia.noticiaData),
        [Validators.required]
      ],
      filial: [noticia.filial],
    });
    // disable imageURL
    this.noticiaForm.controls["imageURL"].disable();
  }

  convertToDate(dateString: string) {
    if (!dateString || !dateString.length) {
      dateString = new Date().toLocaleDateString()
    }
    dateString.split('/').reverse().join('-')
    const myDate = dateString.split('/').reverse().join('-')
    return myDate
  }

  hasError(field: string) : string {
    // verifica os erros do FormGroup
    return FormInputErrors(field, this.noticiaForm)
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
          this.noticia.filial = filial;
          this.noticiaForm.controls['filial'].setValue(filial)
        };
        // on close dialog focus control
        this.dialogOpen = false;
        this.filialControl.nativeElement.focus();
      });
    }
  }

  noticiaLista(){
    this.router.navigate(['/administracao/noticias'])
  }

  onSave(){

    // check image file
    if (this.selectedFile) {
      this.alert.showAlertWarning(
        "A image deve ser enviada antes de salvar",
        "Imagem"
      );
      return;
    }
    // enable imagemURL to save
    this.noticiaForm.controls["imageURL"].enable();
    // check controls values
    this.submited = true;
    // check if is valid
    if (this.noticiaForm.valid) {

      // SALVA A NOTICIA (ADD OR UPDATE)
      if(!this.noticia.id){
        this.addNoticia()
      } else {
        this.updateNoticia()
      }

    } else {
      const controls = this.noticiaForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      if (!controls["imageURL"].value) {
        this.alert.showAlertWarning("Ainda não há imagem escolhida", "Imagem");
      }
      // disable imagemURL to not edited
      this.noticiaForm.controls["imageURL"].disable();
    }
  }

  // ADD
  addNoticia(){
    this.noticiaService.addNewNoticia(this.noticiaForm.value)
    .then((id) => {
      this.noticia.id = id;
      //this.list.unshift(agendaDados);
      this.alert.showAlertSuccess('Notícia salva com sucesso', 'Sucesso');
    }, () => {
      this.alert.showAlertDanger('Não foi possível salvar a Notícia', 'Tente depois');
    })
  }

  // UPDATE
  updateNoticia(){
    this.noticiaService.updateNoticia(this.noticiaForm.value)
    .then(() => {
      this.alert.showAlertSuccess('Notícia atualizada com sucesso', 'Sucesso');
    }, () => {
      this.alert.showAlertDanger('Não foi possível atualizar a Notícia', 'Tente depois');
    })
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
    const dim = dimension.getDimension('noticia')

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
    if (this.noticia.imageName) {
      this.imageService
        .deleteUpload(this.noticia.imageName, 'noticia')
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
    this.currentUpload = new Upload(this.selectedFile, 'noticia');

    this.imageService.uploadFile(this.currentUpload).then(
      url => {
        this.scrollToBottom(); // to see progress bar
        this.noticiaForm.controls['imageName'].setValue(this.selectedFile.name);
        this.noticiaForm.controls['imageURL'].setValue(url);
        this.noticia.imageName = this.selectedFile.name;
        this.noticia.imageURL = url;
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
  //************************************************************************************* */
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
        this.content.nativeElement.scrollIntoView()
      }, 500);
    } catch (err) {
      console.log(err)
    }
  }

}
