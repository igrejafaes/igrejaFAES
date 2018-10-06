import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoriaComponent } from './diretoria.component';

describe('DiretoriaComponent', () => {
  let component: DiretoriaComponent;
  let fixture: ComponentFixture<DiretoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
