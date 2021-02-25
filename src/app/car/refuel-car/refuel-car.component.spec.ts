import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuelCarComponent } from './refuel-car.component';

describe('ReRefuelCarComponent', () => {
  let component: RefuelCarComponent;
  let fixture: ComponentFixture<RefuelCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuelCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuelCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
