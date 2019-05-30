import { Component, OnInit, HostListener } from "@angular/core";
import { AgendaService } from "../../services/agenda.service";
import { clAgenda } from "../../models/clAgenda";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppError } from "src/app/shared/app-errors/app-error";
import { NotFoundError } from "src/app/shared/app-errors/not-found-error";
import { AlertModalService } from "src/app/shared/alert-modal.service";

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.scss"]
})
export class AgendaComponent implements OnInit {
  
  agenda$: Observable<clAgenda[]>; //clAgenda[] = []; // ARRAY DADOS DA AGENDA
  agendas: clAgenda[] = [];
  tamanho: number = window.innerWidth; // TAMANHO DA WINDOW

  constructor(
    private agendaService: AgendaService,
    private modal: AlertModalService
  ) {}

  ngOnInit() {
    // verifica o width da janela
    this.verificaWidth();
    // get a agenda
    this.agenda$ = this.agendaService.getAgenda();

    this.agenda$.pipe(take(1)).subscribe(
      (agendas: clAgenda[]) => {
        this.agendas = agendas;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert("Erro 404. Arquivo não encontrado...");
        } else {
          console.log(error);
          alert("Uma exceção inesperada ocorreu.");
        }
      }
    );
  }

  // método criado para exemplo de como criar agenda
  createAgenda() {
    this.agendaService.createAgenda();
  }

  @HostListener("window:resize") onResize() {
    this.tamanho = window.innerWidth;
    this.verificaWidth();
  }

  verificaWidth(): boolean {
    if (this.tamanho < 576) {
      return false;
    } else {
      return true;
    }
  }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    cssEase: "ease",
    dots: true,
    dotsClass: "slick",
    arrows: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  slickInit(e) {
    //console.log('slick initialized');
  }

  breakpoint(e) {
    //console.log('breakpoint');
  }

  afterChange(e) {
    //console.log('afterChange');
  }

  beforeChange(e) {
    //console.log('beforeChange');
  }

  modalteste() {
    this.modal.showAlertWarning("Minha Mensagem", "Meu Titulo");
  }
}
