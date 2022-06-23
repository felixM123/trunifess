import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArregloIngresosComponent } from './arreglo-ingresos.component';

describe('ArregloIngresosComponent', () => {
  let component: ArregloIngresosComponent;
  let fixture: ComponentFixture<ArregloIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArregloIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArregloIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
