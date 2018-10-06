import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JovensComponent } from './jovens.component';

describe('JovensComponent', () => {
  let component: JovensComponent;
  let fixture: ComponentFixture<JovensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JovensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JovensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
