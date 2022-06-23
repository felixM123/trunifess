import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IreceptionComponent } from './ireception.component';

describe('IreceptionComponent', () => {
  let component: IreceptionComponent;
  let fixture: ComponentFixture<IreceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IreceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IreceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
