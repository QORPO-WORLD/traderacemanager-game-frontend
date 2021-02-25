import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchRaceFullComponent } from './watch-race-full.component';

describe('WatchRaceFullComponent', () => {
  let component: WatchRaceFullComponent;
  let fixture: ComponentFixture<WatchRaceFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchRaceFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchRaceFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
