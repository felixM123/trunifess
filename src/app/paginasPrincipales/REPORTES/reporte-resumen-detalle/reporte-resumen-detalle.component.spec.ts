import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteResumenDetalleComponent } from './reporte-resumen-detalle.component';

describe('ReporteResumenDetalleComponent', () => {
  let component: ReporteResumenDetalleComponent;
  let fixture: ComponentFixture<ReporteResumenDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteResumenDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteResumenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
