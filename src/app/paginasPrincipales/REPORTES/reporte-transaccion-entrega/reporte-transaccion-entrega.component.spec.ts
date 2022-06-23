import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTransaccionEntregaComponent } from './reporte-transaccion-entrega.component';

describe('ReporteTransaccionEntregaComponent', () => {
  let component: ReporteTransaccionEntregaComponent;
  let fixture: ComponentFixture<ReporteTransaccionEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTransaccionEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTransaccionEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
