import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IshippingOrderComponent } from './ishipping-order.component';


describe('IshippingOrderComponent', () => {
  let component: IshippingOrderComponent;
  let fixture: ComponentFixture<IshippingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IshippingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IshippingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
