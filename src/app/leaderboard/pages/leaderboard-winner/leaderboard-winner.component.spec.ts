import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardWinnerComponent } from './leaderboard-winner.component';

describe('LeaderboardWinnerComponent', () => {
  let component: LeaderboardWinnerComponent;
  let fixture: ComponentFixture<LeaderboardWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
