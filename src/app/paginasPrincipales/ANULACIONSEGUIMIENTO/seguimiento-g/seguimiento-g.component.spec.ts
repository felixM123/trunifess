import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoGComponent } from './seguimiento-g.component';

describe('SeguimientoGComponent', () => {
  let component: SeguimientoGComponent;
  let fixture: ComponentFixture<SeguimientoGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
