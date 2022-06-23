import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoDineroComponent } from './egreso-dinero.component';

describe('EgresoDineroComponent', () => {
  let component: EgresoDineroComponent;
  let fixture: ComponentFixture<EgresoDineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresoDineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
