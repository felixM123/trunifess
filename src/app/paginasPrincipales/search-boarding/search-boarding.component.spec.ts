import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoardingComponent } from './search-boarding.component';

describe('SearchBoardingComponent', () => {
  let component: SearchBoardingComponent;
  let fixture: ComponentFixture<SearchBoardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
