import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularGuiaComponent } from './anular-guia.component';

describe('AnularGuiaComponent', () => {
  let component: AnularGuiaComponent;
  let fixture: ComponentFixture<AnularGuiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularGuiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
