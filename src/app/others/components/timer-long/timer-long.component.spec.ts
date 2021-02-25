import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerLongComponent } from './timer.component';

describe('TimerLongComponent', () => {
  let component: TimerLongComponent;
  let fixture: ComponentFixture<TimerLongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerLongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
