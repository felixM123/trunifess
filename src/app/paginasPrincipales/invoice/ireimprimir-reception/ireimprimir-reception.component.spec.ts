import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IreimprimirReceptionComponent } from './ireimprimir-reception.component';

describe('IreimprimirReceptionComponent', () => {
  let component: IreimprimirReceptionComponent;
  let fixture: ComponentFixture<IreimprimirReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IreimprimirReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IreimprimirReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
