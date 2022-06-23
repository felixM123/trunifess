import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRecepcionAgenciaComponent } from './reporte-recepcion-agencia.component';

describe('ReporteRecepcionAgenciaComponent', () => {
  let component: ReporteRecepcionAgenciaComponent;
  let fixture: ComponentFixture<ReporteRecepcionAgenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteRecepcionAgenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteRecepcionAgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
