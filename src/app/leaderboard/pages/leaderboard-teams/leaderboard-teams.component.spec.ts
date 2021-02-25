import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardTeamsComponent } from './leaderboard-teams.component';

describe('LeaderboardTeamsComponent', () => {
  let component: LeaderboardTeamsComponent;
  let fixture: ComponentFixture<LeaderboardTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
