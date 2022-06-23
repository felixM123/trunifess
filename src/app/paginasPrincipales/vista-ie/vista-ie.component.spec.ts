import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaIEComponent } from './vista-ie.component';

describe('VistaIEComponent', () => {
  let component: VistaIEComponent;
  let fixture: ComponentFixture<VistaIEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaIEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaIEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
