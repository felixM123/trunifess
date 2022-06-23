import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdisembarkationComponent } from './idisembarkation.component';

describe('IdisembarkationComponent', () => {
  let component: IdisembarkationComponent;
  let fixture: ComponentFixture<IdisembarkationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdisembarkationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdisembarkationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
