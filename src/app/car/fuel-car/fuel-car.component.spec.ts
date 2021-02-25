import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCarComponent } from './fuel-car.component';

describe('FuelCarComponent', () => {
  let component: FuelCarComponent;
  let fixture: ComponentFixture<FuelCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
