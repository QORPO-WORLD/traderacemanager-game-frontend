import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRacesComponent } from './my-races.component';

describe('MyRacesComponent', () => {
  let component: MyRacesComponent;
  let fixture: ComponentFixture<MyRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
