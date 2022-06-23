import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprecionDesembarcoComponent } from './imprecion-desembarco.component';

describe('ImprecionDesembarcoComponent', () => {
  let component: ImprecionDesembarcoComponent;
  let fixture: ComponentFixture<ImprecionDesembarcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprecionDesembarcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprecionDesembarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
