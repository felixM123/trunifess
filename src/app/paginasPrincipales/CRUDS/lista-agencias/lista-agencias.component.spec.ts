import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgenciasComponent } from './lista-agencias.component';

describe('ListaAgenciasComponent', () => {
  let component: ListaAgenciasComponent;
  let fixture: ComponentFixture<ListaAgenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAgenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
