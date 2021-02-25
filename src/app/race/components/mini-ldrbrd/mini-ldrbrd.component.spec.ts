import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniLdrbrdComponent } from './mini-ldrbrd.component';

describe('MiniLdrbrdComponent', () => {
  let component: MiniLdrbrdComponent;
  let fixture: ComponentFixture<MiniLdrbrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniLdrbrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniLdrbrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
