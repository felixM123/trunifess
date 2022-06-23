import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteResumenTotalComponent } from './reporte-resumen-total.component';

describe('ReporteResumenTotalComponent', () => {
  let component: ReporteResumenTotalComponent;
  let fixture: ComponentFixture<ReporteResumenTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteResumenTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteResumenTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
