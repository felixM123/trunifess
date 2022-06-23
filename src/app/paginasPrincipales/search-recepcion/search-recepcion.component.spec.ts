import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecepcionComponent } from './search-recepcion.component';

describe('SearchRecepcionComponent', () => {
  let component: SearchRecepcionComponent;
  let fixture: ComponentFixture<SearchRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
