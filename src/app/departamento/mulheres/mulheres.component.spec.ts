import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulheresComponent } from './mulheres.component';

describe('MulheresComponent', () => {
  let component: MulheresComponent;
  let fixture: ComponentFixture<MulheresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulheresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
