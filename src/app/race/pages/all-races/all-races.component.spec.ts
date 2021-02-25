import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRacesComponent } from './all-races.component';

describe('AllRacesComponent', () => {
  let component: AllRacesComponent;
  let fixture: ComponentFixture<AllRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
