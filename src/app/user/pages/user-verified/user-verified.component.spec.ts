import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifiedComponent } from './user-verified.component';

describe('UserVerifiedComponent', () => {
  let component: UserVerifiedComponent;
  let fixture: ComponentFixture<UserVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
