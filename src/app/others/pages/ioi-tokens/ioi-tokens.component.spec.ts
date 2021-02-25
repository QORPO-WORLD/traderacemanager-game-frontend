import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoiTokensComponent } from './ioi-tokens.component';

describe('IoiTokensComponent', () => {
  let component: IoiTokensComponent;
  let fixture: ComponentFixture<IoiTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoiTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoiTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
