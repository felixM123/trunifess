import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTotalAgenciaComponent } from './reporte-total-agencia.component';

describe('ReporteTotalAgenciaComponent', () => {
  let component: ReporteTotalAgenciaComponent;
  let fixture: ComponentFixture<ReporteTotalAgenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTotalAgenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTotalAgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
