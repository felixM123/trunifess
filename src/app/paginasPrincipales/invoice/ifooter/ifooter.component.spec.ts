import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfooterComponent } from './ifooter.component';

describe('IfooterComponent', () => {
  let component: IfooterComponent;
  let fixture: ComponentFixture<IfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
