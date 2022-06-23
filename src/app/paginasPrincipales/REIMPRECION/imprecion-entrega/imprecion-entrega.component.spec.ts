import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprecionEntregaComponent } from './imprecion-entrega.component';

describe('ImprecionEntregaComponent', () => {
  let component: ImprecionEntregaComponent;
  let fixture: ComponentFixture<ImprecionEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprecionEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprecionEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
