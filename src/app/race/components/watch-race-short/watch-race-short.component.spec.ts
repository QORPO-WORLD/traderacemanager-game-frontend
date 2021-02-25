import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchRaceShortComponent } from './watch-race-short.component';

describe('WatchRaceShortComponent', () => {
  let component: WatchRaceShortComponent;
  let fixture: ComponentFixture<WatchRaceShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchRaceShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchRaceShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
