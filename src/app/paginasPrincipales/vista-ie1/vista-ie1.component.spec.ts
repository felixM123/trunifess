import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaIE1Component } from './vista-ie1.component';

describe('VistaIE1Component', () => {
  let component: VistaIE1Component;
  let fixture: ComponentFixture<VistaIE1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaIE1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaIE1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
