import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IremoneyComponent } from './iremoney.component';

describe('IremoneyComponent', () => {
  let component: IremoneyComponent;
  let fixture: ComponentFixture<IremoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IremoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IremoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
