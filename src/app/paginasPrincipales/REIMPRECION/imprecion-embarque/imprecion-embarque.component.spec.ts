import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprecionEmbarqueComponent } from './imprecion-embarque.component';

describe('ImprecionEmbarqueComponent', () => {
  let component: ImprecionEmbarqueComponent;
  let fixture: ComponentFixture<ImprecionEmbarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprecionEmbarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprecionEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
