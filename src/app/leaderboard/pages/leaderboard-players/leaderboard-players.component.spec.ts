import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPlayersComponent } from './leaderboard-players.component';

describe('LeaderboardPlayersComponent', () => {
  let component: LeaderboardPlayersComponent;
  let fixture: ComponentFixture<LeaderboardPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
