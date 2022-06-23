import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprecionRecepcionComponent } from './imprecion-recepcion.component';

describe('ImprecionRecepcionComponent', () => {
  let component: ImprecionRecepcionComponent;
  let fixture: ComponentFixture<ImprecionRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprecionRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprecionRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
