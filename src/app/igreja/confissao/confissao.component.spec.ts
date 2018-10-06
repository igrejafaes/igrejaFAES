import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfissaoComponent } from './confissao.component';

describe('ConfissaoComponent', () => {
  let component: ConfissaoComponent;
  let fixture: ComponentFixture<ConfissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
