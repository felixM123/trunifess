import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularEntregaComponent } from './anular-entrega.component';

describe('AnularEntregaComponent', () => {
  let component: AnularEntregaComponent;
  let fixture: ComponentFixture<AnularEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
