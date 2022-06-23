import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesembarcoComponent } from './desembarco.component';

describe('DesembarcoComponent', () => {
  let component: DesembarcoComponent;
  let fixture: ComponentFixture<DesembarcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesembarcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesembarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
