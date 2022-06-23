import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularRecepcionComponent } from './anular-recepcion.component';

describe('AnularRecepcionComponent', () => {
  let component: AnularRecepcionComponent;
  let fixture: ComponentFixture<AnularRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
