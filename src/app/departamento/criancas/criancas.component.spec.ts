import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriancasComponent } from './criancas.component';

describe('CriancasComponent', () => {
  let component: CriancasComponent;
  let fixture: ComponentFixture<CriancasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriancasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
