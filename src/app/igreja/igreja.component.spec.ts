import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgrejaComponent } from './igreja.component';

describe('IgrejaComponent', () => {
  let component: IgrejaComponent;
  let fixture: ComponentFixture<IgrejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgrejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
