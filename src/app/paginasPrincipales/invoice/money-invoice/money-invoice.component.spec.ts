import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyInvoiceComponent } from './money-invoice.component';

describe('MoneyInvoiceComponent', () => {
  let component: MoneyInvoiceComponent;
  let fixture: ComponentFixture<MoneyInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
