import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarsComponent } from './buy-cars.component';

describe('BuyCarsComponent', () => {
  let component: BuyCarsComponent;
  let fixture: ComponentFixture<BuyCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
