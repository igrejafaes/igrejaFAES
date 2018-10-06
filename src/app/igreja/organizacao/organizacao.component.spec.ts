import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoComponent } from './organizacao.component';

describe('OrganizacaoComponent', () => {
  let component: OrganizacaoComponent;
  let fixture: ComponentFixture<OrganizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
