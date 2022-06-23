import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTransaccionComponent } from './reporte-transaccion.component';

describe('ReporteTransaccionComponent', () => {
  let component: ReporteTransaccionComponent;
  let fixture: ComponentFixture<ReporteTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
