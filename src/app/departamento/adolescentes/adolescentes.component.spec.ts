import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdolescentesComponent } from './adolescentes.component';

describe('AdolescentesComponent', () => {
  let component: AdolescentesComponent;
  let fixture: ComponentFixture<AdolescentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdolescentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdolescentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
