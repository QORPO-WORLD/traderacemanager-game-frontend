import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralPlayersComponent } from './referral-players.component';

describe('ReferralPlayersComponent', () => {
  let component: ReferralPlayersComponent;
  let fixture: ComponentFixture<ReferralPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
