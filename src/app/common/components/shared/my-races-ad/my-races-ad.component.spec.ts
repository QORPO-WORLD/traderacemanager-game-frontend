import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyRacesAdComponent } from './my-races-ad.component';

describe('MyRacesAdComponent', () => {
  let component: MyRacesAdComponent;
  let fixture: ComponentFixture<MyRacesAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRacesAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRacesAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
