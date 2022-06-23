import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeliveryComponent } from './idelivery.component';

describe('IdeliveryComponent', () => {
  let component: IdeliveryComponent;
  let fixture: ComponentFixture<IdeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
